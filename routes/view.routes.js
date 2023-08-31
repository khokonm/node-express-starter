const router = require("express").Router();
const ViewControllers = require("../controllers/views/index");

router.get("/", ViewControllers.Home);

module.exports = router;