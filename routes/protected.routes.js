const router = require("express").Router();
const ViewControllers = require("../controllers/views");

router.get("/", ViewControllers.Dashboard);

module.exports = router;