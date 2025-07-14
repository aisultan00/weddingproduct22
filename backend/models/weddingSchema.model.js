import mongoose from "mongoose";

const weddingSchema = new mongoose.Schema({
    groom: { type: String, required: true},
    bride: { type: String, required: true},
    desire: { type: String, required: true},
    date: { type: Date, required: true },
    location: { type: String, required: true},
    representatives: { type: [String], required: true, validate: v => Array.isArray(v) && v.length > 0 },
    image: { type: String},
    families: [{
        familyName: { type: String, required: true},
        guests: [{ name: { type: String, required: true} }],
        wish: { type: String}
    }],
    isPaid: { type: Boolean, default: false },
});

const Wedding = mongoose.model("Wedding", weddingSchema);
export default Wedding;