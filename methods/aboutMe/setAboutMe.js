import { AboutMe } from "../../models/index.js";

const setAboutMe = async (req, res) => {
    try {
        const aboutMeInfo = await AboutMe.find().populate().exec();

        const body = req.body;

        if (body.text) {

            if (aboutMeInfo.length > 1) {
                
                for (let i = 0; i < aboutMeInfo.length; i++) {

                    const info  = aboutMeInfo[i];

                    await AboutMe.findOneAndDelete({
                        _id: info._id
                    });
                }
            } else if (!aboutMeInfo || !aboutMeInfo.length) {
                const doc = new AboutMe({
                    text: req.body.text,
                    image: req.body.image
                });
                
                const aboutMe = await doc.save();

                return res.status(200).json({
                    result: aboutMe,
                    message: 'Info successfully uploaded!',
                    success: true
                });
            }

            await AboutMe.updateOne({
                _id: aboutMeInfo[0]._id
            }, {
                text: req.body.text,
                image: req.body.image
            });

            res.status(200).json({
                message: 'Info successfully updated!',
                success: true,
            });

        }

    } catch {
        res.status(400).json({
            message: 'Cannot set new info about me',
            success: false
        })
    }
}

export default setAboutMe;