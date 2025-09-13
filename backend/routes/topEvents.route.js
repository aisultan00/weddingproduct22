import express from 'express';
import Wedding from '../models/weddingSchema.model.js';
import Betashar from '../models/BetasharSchema.model.js';
import Merey from '../models/MereySchema.model.js';
import Sundet from '../models/SundetSchema.model.js';
import Tkeser from '../models/tusaukeserSchema.model.js';
import Uzatu from '../models/uzatuSchema.model.js';

const router = express.Router();

// Функция для подсчета общего количества гостей
const countTotalGuests = (families) => {
    return families.reduce((total, family) => total + family.guests.length, 0);
};

// GET /api/top-events - получить топ 50 мероприятий с наибольшим количеством гостей
router.get('/', async (req, res) => {
    try {
        // Получаем все мероприятия из всех коллекций
        const [weddings, betashars, mereys, sundets, tkesers, uzatus] = await Promise.all([
            Wedding.find({}).lean(),
            Betashar.find({}).lean(),
            Merey.find({}).lean(),
            Sundet.find({}).lean(),
            Tkeser.find({}).lean(),
            Uzatu.find({}).lean()
        ]);

        // Объединяем все мероприятия с указанием типа
        const allEvents = [
            ...weddings.map(event => ({ ...event, type: 'wedding', typeName: 'Той' })),
            ...betashars.map(event => ({ ...event, type: 'betashar', typeName: 'Беташар' })),
            ...mereys.map(event => ({ ...event, type: 'merey', typeName: 'Мерей' })),
            ...sundets.map(event => ({ ...event, type: 'sundet', typeName: 'Сүндет' })),
            ...tkesers.map(event => ({ ...event, type: 'tkeser', typeName: 'Тұсау кесер' })),
            ...uzatus.map(event => ({ ...event, type: 'uzatu', typeName: 'Ұзату' }))
        ];

        // Подсчитываем количество гостей для каждого мероприятия и сортируем
        const eventsWithGuestCount = allEvents.map(event => {
            const totalGuests = countTotalGuests(event.families || []);
            return {
                ...event,
                totalGuests,
                // Добавляем информацию о представителях для отображения
                mainPerson: event.groom || event.bride || event.kelin || event.person || event.toddler || 'Не указано'
            };
        });

        // Сортируем по количеству гостей (по убыванию) и берем топ 50
        const topEvents = eventsWithGuestCount
            .sort((a, b) => b.totalGuests - a.totalGuests)
            .slice(0, 50);

        res.json({
            success: true,
            data: topEvents,
            total: topEvents.length
        });

    } catch (error) {
        console.error('Error fetching top events:', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении топ мероприятий',
            error: error.message
        });
    }
});

export default router;
