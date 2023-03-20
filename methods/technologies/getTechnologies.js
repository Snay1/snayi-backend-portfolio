import { Technology } from "../../models/index.js";

const getTechnologies = async (req, res) => {

    try {
        
        const technologies = await Technology.find().populate().exec();

        res.status(200).json({
            result: technologies,
            success: true,
        })

    } catch {
        res.status(500).json({
            message: "Cannot get technologies",
            success: false
        })
    }

}

export default getTechnologies;