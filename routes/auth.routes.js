const router = require("express").Router();
const AuthController = require("../controllers/auth");

router.post("/", AuthController.Login);
router.post("/register", AuthController.Register);
router.post("/renew", AuthController.RenewJWT);
router.post("/logout", AuthController.Logout);

module.exports = router;