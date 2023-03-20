import { Technology, Work } from "../../models/index.js";

const deleleTechnology = async (req, res) => {
    try {
        
        const technology = req.params.id;

        Technology.findOneAndDelete({
            _id: technology
        },
        async (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: 'Server error',
                    success: false
                });
            }
            if (!doc) {
                return res.status(400).json({
                    message: 'Cannot delete technology',
                    success: false
                });
            }

            const works = await Work.find();

            for (let i = 0; i < works.length; i++) {

                const work = works[i];

                await Work.findOneAndUpdate({
                    _id: work._id
                }, {
                    technologies: work.technologies.filter(item => `${item._id}` !== technology)
                });

            }

            res.status(200).json({
                message: 'Technology successfully deleted',
                success: true
            });
        });

    } catch {
        res.status(400).json({
            message: "Cannot delete technology",
            success: false
        })
    }
}

export default deleleTechnology;