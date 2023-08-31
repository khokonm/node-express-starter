const router = require("express").Router();

const ViewRoutes = require("./view.routes");

router.use("/", ViewRoutes);

module.exports = router;