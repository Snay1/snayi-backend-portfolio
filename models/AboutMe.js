import mongoose from "mongoose";

const AboutMeSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
});

export default mongoose.model('AboutMe', AboutMeSchema);