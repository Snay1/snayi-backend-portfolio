import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Admin } from '../../models/index.js';

const AdminRegister = async (req, res) => {
    try {

        const admins = await Admin.find().populate().exec();

        if (admins.length > 0) {
            return res.status(404).json({
                message: 'Error!',
                success: false
            });
        }

        const passwordReq = req.body.password;
        const secretRegistrationKey = req.body.secretKey;

        if (secretRegistrationKey !== process.env.SECRET_REGISTRATION_KEY) {
            return res.status(404).json({
                message: 'Error!2',
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(passwordReq, salt);

        const doc = new Admin({
            email: req.body.email,
            password: passwordHash
        });

        const admin = await doc.save();

        const token = jwt.sign({_id: admin._id}, process.env.JWT_ALGORITHM,{ expiresIn: '30d' });

        const { password, ...other } = admin._doc;

        res.status(200).json({
            success: true,
            result: {
                token,
                ...other
            },
            message: "Welcome ^_^"
        });
    }
    catch {
        res.status(404).json({
            message: "Error!",
            success: false
        });
    }
}

export default AdminRegister;