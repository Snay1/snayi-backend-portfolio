import { Work, Technology } from "../../models/index.js";

const uploadWork = async (req, res) => {
    try {

        const technologiesArr = [];

        const techIds = req.body.technologies;

        if (techIds) {

            for (let i = 0; i < techIds.length; i++) {
                const tech = await Technology.findById(techIds[i]);
                technologiesArr.push(tech);
            }
        }

        const doc = new Work({
            title: req.body.title,
            description: req.body.description,
            images: req.body.images,
            workLink: req.body.workLink,
            technologies: technologiesArr
        });

        const work = await doc.save();

        res.status(200).json(work);
    }
    catch {
        res.status(404).json({
            message: `Can't add a new work`,
            success: false
        });
    }
}

export default uploadWork;