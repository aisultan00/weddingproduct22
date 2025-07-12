import mongoose from "mongoose";

const sundetSchema = new mongoose.Schema({
    toddler: { type: String, required: true, minlength: 2, maxlength: 100 },
    desire: { type: String, required: true, maxlength: 500 },
    date: { type: Date, required: true },
    location: { type: String, required: true, maxlength: 200 },
    representatives: { type: [String], required: true, validate: v => Array.isArray(v) && v.length > 0 },
    image: { type: String, maxlength: 500 },
    families: [{
        familyName: { type: String, required: true, maxlength: 100 },
        guests: [{ name: { type: String, required: true, maxlength: 100 } }],
        wish: { type: String, maxlength: 500 }
    }],
    isPaid: { type: Boolean, default: false },
});

const Sundet = mongoose.model("Sundet", sundetSchema);
export default Sundet;