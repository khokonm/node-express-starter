const serverError = require("../../utils/serverError.util");

exports.Home = (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        serverError(res, 500, error.message);
    }
}

exports.Dashboard = (req, res) => {
    try {
        res.render("dashboard");
    } catch (error) {
        serverError(res, 500, error.message);
    }
}