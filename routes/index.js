const router = require("express").Router();

const ViewRoutes = require("./view.routes");
const AuthRoutes = require("./auth.routes");
const ProtectedRoutes = require("./protected.routes");

router.use("/", ViewRoutes);
router.use("/auth", AuthRoutes);
router.use("/protected", ProtectedRoutes);

module.exports = router;