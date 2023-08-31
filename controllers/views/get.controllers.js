const serverError = require("../../utils/serverError.util");

exports.Home = (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        serverError(res, 500, error.message);
    }
}