import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import WeddingRoutes from "./routes/wedding.route.js"
import UzatuRoutes from "./routes/uzatu.route.js"
import SundetRoutes from "./routes/sundet.route.js"
import BetasharRoutes from "./routes/betashar.route.js"
import MereyRoutes from "./routes/merey.route.js"
import TkesersRoutes from "./routes/tusaukeser.route.js"

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
  origin: [`${process.env.FRONTEND_URL}`, 'http://localhost:3000'], // разрешённые источники
  credentials: true
}));
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api/wedding", WeddingRoutes);
app.use("/api/uzatus", UzatuRoutes);
app.use("/api/sundet", SundetRoutes);
app.use("/api/betashar",BetasharRoutes)
app.use("/api/merey",MereyRoutes)
app.use("/api/tkesers",TkesersRoutes);
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));