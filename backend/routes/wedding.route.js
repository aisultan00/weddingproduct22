import express from "express";
import Wedding from '../models/weddingSchema.model.js';
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
    const weddings = await Wedding.find();
    res.json(weddings);
});

// Получить свадьбу по ID
router.get('/:id',
  param('id').isMongoId().withMessage('Некорректный ID'),
  validate,
  async (req, res) => {
    try {
        const wedding = await Wedding.findById(req.params.id);
        if (!wedding) return res.status(404).json({ message: "Свадьба не найдена" });
        res.json(wedding);
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
        const wedding = await Wedding.findById(req.params.id);
        if (!wedding) return res.status(404).json({ message: "Свадьба не найдена" });

        wedding.families.push({ familyName, guests, wish });
        await wedding.save();
        res.json(wedding);
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
        const wedding = await Wedding.findById(req.params.id);
        if (!wedding) return res.status(404).json({ message: "Свадьба не найдена" });

        const guestCount = wedding.families.reduce((total, family) => total + family.guests.length, 0);
        res.json({ guestCount });
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.post('/create-checkout-session',
  body('groom').isString().notEmpty(),
  body('bride').isString().notEmpty(),
  body('desire').isString().notEmpty(),
  body('date').isString().notEmpty(),
  body('location').isString().notEmpty(),
  body('representatives').isArray(),
  body('image').optional().isString(),
  validate,
  async (req, res) => {
    try {
        const { groom, bride, desire, date, location, representatives, image } = req.body;
        let uploadResponse;
        let imageUrl = "";
        if (image) {
            uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newWedding = new Wedding({
            groom,
            bride,
            desire,
            date,
            location,
            representatives,
            image: imageUrl,
        });
        await newWedding.save();
        res.json({ url: `${process.env.FRONTEND_URL}/wedding/${newWedding._id}` });
    } catch (err) {
        res.status(500).json({ error: "Ошибка создания свадьбы", details: err.message });
    }
});

export default router;