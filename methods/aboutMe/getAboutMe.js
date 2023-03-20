
import { AboutMe } from "../../models/index.js";

const getAboutMe = async (req, res) => {
    try {
        const aboutMeInfo = await AboutMe.find().populate().exec();

        return res.status(200).json({
            result: aboutMeInfo.length === 1 ? aboutMeInfo[0] : null,
            success: true,
        })

    } catch {
        res.status(400).json({
            message: 'Cannot get information about me :///',
            success: false
        })
    }
}

export default getAboutMe;