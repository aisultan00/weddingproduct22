import mongoose from "mongoose";

const betasharSchema = new mongoose.Schema({
    kelin: { type: String, required: true},
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

const Betashar = mongoose.model("Betashar", betasharSchema);
export default Betashar;