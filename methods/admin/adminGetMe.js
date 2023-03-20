
const adminGetMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Auth ^_^'
        })
    } catch {
        res.status(400).json({
            message: 'U do not have permission',
            success: false
        });
    }
}

export default adminGetMe;