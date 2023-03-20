
import { Work } from "../../models/index.js";

const deleteWork = async (req, res) => {
    try {

        const workId = req.params.id;

        Work.findOneAndDelete({
            _id: workId
        },
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Server error',
                    success: false
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'work not found',
                    success: false
                });
            }

            res.status(200).json({
                message: 'work successfully deleted',
                success: true
            });

        });


    } 
    catch {
        res.status(404).json({
            message: `Can't delete the work :///`,
            success: false
        });
    }
};

export default deleteWork;