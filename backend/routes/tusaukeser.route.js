import express from "express";
import cloudinary from '../cloudinary.js';
import Tkeser from "../models/tusaukeserSchema.model.js";
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

    res.json({ url: `${process.env.FRONTEND_URL}/tkesers/${newTkeser._id}` });
  } catch (err) {
    console.error("Ошибка создания tkeser:", err);
    res.status(500).json({ error: "Ошибка создания tkeser", details: err.message });
  }
});

export default router;