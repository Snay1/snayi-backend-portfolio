import mongoose from "mongoose";

const TechnologySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export default mongoose.model('Technology', TechnologySchema);
