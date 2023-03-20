import { Technology } from "../../models/index.js";

const uploadTechnology = async (req, res) => {
    try {
        const doc = new Technology({
            title: req.body.title,
            image: req.body.image,
        });

        await doc.save();

        res.status(200).json({
            message: 'Technology successfully uploaded',
            success: true,
        });

    } catch  {
        res.status(400).json({
            message: 'Cannot add a new technology',
            success: false
        })
    }
}

export default uploadTechnology;