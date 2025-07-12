import express from "express";
import cloudinary from '../cloudinary.js';
import Tkeser from "../models/tusaukeserSchema.model.js";
import Stripe from "stripe";
import { body, param, validationResult } from 'express-validator';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Получить список свадеб
router.get('/', async (req, res) => {
    const tkeserler = await Tkeser.find();
    res.json(tkeserler);
});

// Получить свадьбу по ID
router.get('/:id',
  param('id').isMongoId().withMessage('Некорректный ID'),
  validate,
  async (req, res) => {
    try {
        const tkeser = await Tkeser.findById(req.params.id);
        if (!tkeser) return res.status(404).json({ message: "Той табылмады" });
        res.json(tkeser);
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
        const { familyName, guests , wish} = req.body;
        const tkeser = await Tkeser.findById(req.params.id);
        if (!tkeser) return res.status(404).json({ message: "Свадьба не найдена" });

        tkeser.families.push({ familyName, guests, wish });
        await tkeser.save();
        res.json(tkeser);
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
        const tkeser = await Tkeser.findById(req.params.id);
        if (!tkeser) return res.status(404).json({ message: "Свадьба не найдена" });

        const guestCount = tkeser.families.reduce((total, family) => total + family.guests.length, 0);
        res.json({ guestCount });
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Stripe: создать сессию оплаты
router.post('/create-checkout-session',
  body('toddler').isString().notEmpty(),
  body('desire').isString().notEmpty(),
  body('date').isString().notEmpty(),
  body('location').isString().notEmpty(),
  body('representatives').isArray(),
  body('image').optional().isString(),
  validate,
  async (req, res) => {
  try {
    const { toddler, desire, date, location, representatives, image } = req.body;
    let uploadResponse;
    let imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newTkeser = new Tkeser({
      toddler,
      desire,
      date,
      location,
      representatives,
      image: imageUrl,
      isPaid: false,
    });

    await newTkeser.save();

    const amount = 500000;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'kzt',
          product_data: {
            name: `Тұсаукесер: ${toddler}`,
            description: desire,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/tkesers/${newTkeser._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        type: "tkeser",
        ToyId: newTkeser._id.toString(),
      },
    });
    

    res.json({ url: session.url });
  } catch (err) {
    console.error("Ошибка создания tkeser:", err);
    res.status(500).json({ error: "Ошибка оплаты", details: err.message });
  }
});

export default router;