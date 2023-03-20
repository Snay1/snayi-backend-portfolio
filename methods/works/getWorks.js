import { Work } from "../../models/index.js";

const getWorks = async (req, res) => {
    try {

        const works = await Work.find().populate().exec();

        res.status(200).json({
            result: works,
            success: true
        });
    } 
    catch {
        res.status(404).json({
            message: "Error!",
            success: false
        });
    }
}

export default getWorks;