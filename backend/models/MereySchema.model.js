import mongoose from "mongoose";

const mereySchema = new mongoose.Schema({
    person: { type: String, required: true},
    age: { type: Number, required: true, min: 0, max: 120 },
    desire: { type: String, required: true},
    date: { type: Date, required: true },
    location: { type: String, required: true},
    representatives: { type: [String], required: true, validate: v => Array.isArray(v) && v.length > 0 },
    image: { type: String},
    families: [{
        familyName: { type: String, required: true },
        guests: [{ name: { type: String, required: true } }],
        wish: { type: String }
    }],
    isPaid: { type: Boolean, default: false },
});

const Merey = mongoose.model("Merey", mereySchema);
export default Merey;