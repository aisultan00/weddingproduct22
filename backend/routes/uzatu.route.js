import express from "express";
import Uzatu from '../models/uzatuSchema.model.js';
import cloudinary from '../cloudinary.js';
import { body, param, validationResult } from 'express-validator';

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
    const Uzatular = await Uzatu.find();
    res.json(Uzatular);
});

// Получить свадьбу по ID
router.get('/:id',
  param('id').isMongoId().withMessage('Некорректный ID'),
  validate,
  async (req, res) => {
    try {
        const uzatu = await Uzatu.findById(req.params.id);
        if (!uzatu) return res.status(404).json({ message: "Свадьба не найдена" });
        res.json(uzatu);
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
        const uzatu = await Uzatu.findById(req.params.id);
        if (!uzatu) return res.status(404).json({ message: "Свадьба не найдена" });

        uzatu.families.push({ familyName, guests, wish });
        await uzatu.save();
        res.json(uzatu);
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
        const uzatu = await Uzatu.findById(req.params.id);
        if (!uzatu) return res.status(404).json({ message: "Свадьба не найдена" });

        const guestCount = uzatu.families.reduce((total, family) => total + family.guests.length, 0);
        res.json({ guestCount });
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Stripe: создать сессию оплаты
router.post('/create-checkout-session',
  body('groom').isString().notEmpty(),
  body('desire').isString().notEmpty(),
  body('date').isString().notEmpty(),
  body('location').isString().notEmpty(),
  body('representatives').isArray(),
  body('image').optional().isString(),
  validate,
  async (req, res) => {
  try {
    const { groom, desire, date, location, representatives, image } = req.body;
    let uploadResponse;
    let imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newUzatus = new Uzatu({
      groom,
      desire,
      date,
      location,
      representatives,
      image: imageUrl,
      isPaid: false,
    });

    await newUzatus.save();

    res.json({ url: `${process.env.FRONTEND_URL}/uzatus/${newUzatus._id}` });
  } catch (err) {
    console.error("Ошибка создания узатус:", err);
    res.status(500).json({ error: "Ошибка создания узатус", details: err.message });
  }
});

export default router;