import mongoose from "mongoose";

const AdminModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('Admin', AdminModel);