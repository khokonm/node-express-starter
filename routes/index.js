const router = require("express").Router();

const ViewRoutes = require("./view.routes");
const AuthRoutes = require("./auth.routes");
const ProtectedRoutes = require("./protected.routes");

const isAuth = require("../middleware/auth.middleware");

router.use("/", ViewRoutes);
router.use("/auth", AuthRoutes);
router.use("/dashboard", isAuth, ProtectedRoutes);

module.exports = router;