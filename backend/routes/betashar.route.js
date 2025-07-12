import express from "express";
import cloudinary from '../cloudinary.js';
import Betashar from "../models/BetasharSchema.model.js";
import Stripe from "stripe";
import { body, param, validationResult } from 'express-validator';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// Middleware для обработки ошибок валидации
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Получить список свадеб
router.get('/', async (req, res) => {
    const betasharlar = await Betashar.find();
    res.json(betasharlar);
});

// Получить свадьбу по ID
router.get('/:id',
  param('id').isMongoId().withMessage('Некорректный ID'),
  validate,
  async (req, res) => {
    try {
        const betashar = await Betashar.findById(req.params.id);
        if (!betashar) return res.status(404).json({ message: "Свадьба не найдена" });
        res.json(betashar);
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Добавить семью и гостей на свадьбу
router.post('/:id/add-family',
  param('id').isMongoId().withMessage('Некорректный ID'),
  body('familyName').isString().notEmpty(),
  body('guests').isArray(),
  body('wish').optional().isString(),
  validate,
  async (req, res) => {
    try {
        const { familyName, guests, wish } = req.body;
        const betashar = await Betashar.findById(req.params.id);
        if (!betashar) return res.status(404).json({ message: "Свадьба не найдена" });

        betashar.families.push({ familyName, guests, wish });
        await betashar.save();
        res.json(betashar);
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Получить количество гостей на свадьбе
router.get('/:id/guest-count',
  param('id').isMongoId().withMessage('Некорректный ID'),
  validate,
  async (req, res) => {
    try {
        const betashar = await Betashar.findById(req.params.id);
        if (!betashar) return res.status(404).json({ message: "Свадьба не найдена" });

        const guestCount = betashar.families.reduce((total, family) => total + family.guests.length, 0);
        res.json({ guestCount });
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// POST /create-betashar-session
router.post('/create-checkout-session',
  body('kelin').isString().notEmpty(),
  body('desire').isString().notEmpty(),
  body('date').isString().notEmpty(),
  body('location').isString().notEmpty(),
  body('representatives').isArray(),
  body('image').optional().isString(),
  validate,
  async (req, res) => {
  try {
    const { kelin, desire, date, location, representatives, image} = req.body;

    let uploadResponse;
    let imageUrl = "";

    if (image) {
      uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // 1. Сохраняем свадьбу в базе
    const newBetashar = new Betashar({
      kelin,
      desire,
      date,
      location,
      representatives,
      image: imageUrl,
    });

    await newBetashar.save(); // MongoDB _id теперь доступен

    const amount = 500000; // в тыйын (5000 тг)

    // 2. Создаём Stripe сессию
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'kzt',
          product_data: {
            name: `Беташар: ${kelin}`,
            description: desire,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/betashar/${newBetashar._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        type: 'betashar',
        ToyId: newBetashar._id.toString(),
      },
    });

    // 3. Обновляем betashar с session ID

    res.json({ url: session.url });
  } catch (err) {
    console.error('Ошибка создания беташара:', err);
    res.status(500).json({ error: 'Ошибка оплаты', details: err.message });
  }
});

export default router;
