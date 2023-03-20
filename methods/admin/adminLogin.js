import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Admin } from '../../models/index.js';

const adminLogin = async (req, res) => {
    try {

        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            return res.status(400).json({
                message: 'Admin not found',
                success: false
            });
        }

        const passValidation = await bcrypt.compare(req.body.password, admin._doc.password);

        if (!passValidation) {
            return res.status(400).json({
                message: 'error)))',
                success: false
            })
        }

        const token = jwt.sign({_id: admin._id}, process.env.JWT_ALGORITHM,{ expiresIn: '30d' });

        const { password, ...other } = admin._doc;

        res.status(200).json({
            success: true,
            result: {
                token,
                ...other
            },
            message: "Welcome to ur profile ^_^"
        });
    }
    catch {
        res.status(404).json({
            message: "Error!",
            success: false
        });
    }
}

export default adminLogin;