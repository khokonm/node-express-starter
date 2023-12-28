const router = require("express").Router();
const AuthController = require("../controllers/auth");

router.get("/", AuthController.Login);
router.get("/register", AuthController.Register);

router.post("/", AuthController.LoginWithPassword);
router.post("/register", AuthController.RegisterPost);

router.get("/logout", AuthController.Logout);

module.exports = router;