import express from 'express';
import Wedding from '../models/weddingSchema.model.js';
import Betashar from '../models/BetasharSchema.model.js';
import Merey from '../models/MereySchema.model.js';
import Sundet from '../models/SundetSchema.model.js';
import Tkeser from '../models/tusaukeserSchema.model.js';
import Uzatu from '../models/uzatuSchema.model.js';

const router = express.Router();

// Агрегация для подсчета гостей на уровне MongoDB
const getEventsWithGuestCount = async (Model, type, typeName, mainPersonFields) => {
    return Model.aggregate([
        {
            $addFields: {
                totalGuests: {
                    $sum: {
                        $map: {
                            input: "$families",
                            as: "family",
                            in: { $size: "$$family.guests" }
                        }
                    }
                },
                mainPerson: {
                    $ifNull: mainPersonFields.map(f => `$${f}`).reduceRight((acc, curr) => ({
                        $ifNull: [curr, acc]
                    }))
                }
            }
        },
        {
            $project: {
                families: 1,
                totalGuests: 1,
                mainPerson: 1,
                representatives: 1,
                image: 1,
                date: 1,
                location: 1,
                type: { $literal: type },
                typeName: { $literal: typeName }
            }
        }
    ]);
};

router.get('/', async (req, res) => {
    try {
        const [
            weddings,
            betashars,
            mereys,
            sundets,
            tkesers,
            uzatus
        ] = await Promise.all([
            getEventsWithGuestCount(Wedding, 'wedding', 'Той', ['groom', 'bride']),
            getEventsWithGuestCount(Betashar, 'betashar', 'Беташар', ['kelin']),
            getEventsWithGuestCount(Merey, 'merey', 'Мерей', ['person']),
            getEventsWithGuestCount(Sundet, 'sundet', 'Сүндет', ['toddler']),
            getEventsWithGuestCount(Tkeser, 'tkeser', 'Тұсау кесер', ['toddler']),
            getEventsWithGuestCount(Uzatu, 'uzatu', 'Ұзату', ['groom'])
        ]);

        const allEvents = [
            ...weddings,
            ...betashars,
            ...mereys,
            ...sundets,
            ...tkesers,
            ...uzatus
        ];

        const topEvents = allEvents
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