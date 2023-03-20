import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '').trim();

    const accessError = () => {
        return res.status(400).json({
            message: 'Token Error!',
            success: false
        })
    }

    if (token) {
        try {

            const decodedPass = jwt.verify(token, process.env.JWT_ALGORITHM);

            req.adminId = decodedPass._id;
        
            return next();

        }
        catch {
            return accessError();
        }
    } 

    return accessError();

}