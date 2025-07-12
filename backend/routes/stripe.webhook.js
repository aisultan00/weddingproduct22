import express from "express";
import Stripe from "stripe";
import Betashar from "../models/BetasharSchema.model.js";
import Wedding from "../models/weddingSchema.model.js";
import Sundet from "../models/SundetSchema.model.js";
import Tkeser from "../models/tusaukeserSchema.model.js";
import Merey from "../models/MereySchema.model.js";
import Uzatu from "../models/uzatuSchema.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const session = event.data.object;
    const type = session.metadata?.type;
    const id = session.metadata?.id;

    // ✅ УСПЕШНАЯ ОПЛАТА
    if (
        event.type === 'checkout.session.completed' &&
        session.payment_status === 'paid' &&
        session.status === 'complete'
    ) {
        try {
            switch (type) {
                case "betashar":
                    await Betashar.findByIdAndUpdate(id, { isPaid: true });
                    break;
                case "wedding":
                    await Wedding.findByIdAndUpdate(id, { isPaid: true });
                    break;
                case "sundet":
                    await Sundet.findByIdAndUpdate(id, { isPaid: true });
                    break;
                case "tkesers":
                    await Tkeser.findByIdAndUpdate(id, { isPaid: true });
                    break;
                case "merey":
                    await Merey.findByIdAndUpdate(id, { isPaid: true });
                    break;
                case "uzatus":
                    await Uzatu.findByIdAndUpdate(id, { isPaid: true });
                    break;
            }
            console.log(`✅ ${type} ${id} → isPaid: true`);
        } catch (err) {
            console.error("❌ Ошибка при установке isPaid:", err);
        }
    }

    // ❌ ПРОСРОЧЕНА / ОТМЕНЕНА / НЕ УДАЛОСЬ
    if (
        event.type === 'checkout.session.expired' ||
        event.type === 'checkout.session.async_payment_failed'
    ) {
        try {
            switch (type) {
                case "betashar":
                    await Betashar.findByIdAndDelete(id);
                    break;
                case "uzatus":
                    await Uzatu.findByIdAndDelete(id);
                    break;
                case "merey":
                    await Merey.findByIdAndDelete(id);
                    break;
                case "tkesers":
                    await Tkeser.findByIdAndDelete(id);
                    break;
                case "sundet":
                    await Sundet.findByIdAndDelete(id);
                    break;
            }
            console.log(`🗑️ ${type} ${id} удалён — платёж отменён или не удался`);
        } catch (err) {
            console.error(`❌ Ошибка при удалении ${type}:`, err);
        }
    }

    res.json({ received: true });
});

export default router;
