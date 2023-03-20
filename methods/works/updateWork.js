
import { Work } from "../../models/index.js";

const updateWork = async (req, res) => {
    try {

        const workId = req.params.id;

        await Work.updateOne({
            _id: workId
        },{
            title: req.body.title,
            description: req.body.description,
            images: req.body.images,
            workLink: req.body.workLink
        });

        res.status(200).json({
            message: 'work succesfully updated',
            success: true
        })

    } 
    catch {
        res.status(404).json({
            message: `Can't update the work :///`,
            success: false
        });
    }
}

export default updateWork;