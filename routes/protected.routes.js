const router = require("express").Router();
const ProtectedController = require("../controllers/protected");
const UserAuth = require("../middlewares/userAuth.middleware");

router.get("/", UserAuth, ProtectedController.Protected);

module.exports = router;