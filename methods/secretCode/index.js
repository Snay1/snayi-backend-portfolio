export const sendSecretCode = (req, res) => {

    try {
        if (req.body.secretCode === process.env.SECRET_CODE_FOR_REGISTRATION) {
            return res.status(200).json({
                message: 'Succesfully verified',
                success: true
            });
        }

        res.status(400).json({
            message: 'Wrong code',
            success: false
        });

    } catch {
        res.status(400).json({
            message: 'Error!',
            success: false
        })
    }

}