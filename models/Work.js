import mongoose from "mongoose";
import Technology from "./Technology.js";

const WorkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    workLink: {
        type: String,
        required: true
    },
    technologies: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
});

export default mongoose.model('Work', WorkSchema);