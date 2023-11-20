const serverError = require("../../utils/serverError.util");

exports.Protected = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "This is a protected route."
        });
    } catch (error) {
        serverError(res, 500, error.message);
    }
}