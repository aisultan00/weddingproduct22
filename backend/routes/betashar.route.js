import express from "express";
import cloudinary from '../cloudinary.js';
import Betashar from "../models/BetasharSchema.model.js";
import { body, param, validationResult } from 'express-validator';

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

    await newBetashar.save();

    res.json({ url: `${process.env.FRONTEND_URL}/betashar/${newBetashar._id}` });
  } catch (err) {
    console.error('Ошибка создания беташара:', err);
    res.status(500).json({ error: 'Ошибка создания беташара', details: err.message });
  }
});

export default router;
