const UsersController = require("../controllers/UsersController");
const router = require("express").Router();
const authVerify = require("../midllewares/authVerify");
router.post("/register", UsersController.registerUser);

router.post("/login", UsersController.loginUser);

router.get("/logout", UsersController.logoutUser);

router.get("/info", authVerify, UsersController.infoUser);

module.exports = router;
