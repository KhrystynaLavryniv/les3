const UsersController = require("../controllers/UsersController");
const router = require("express").Router();

router.post("/register", UsersController.registerUser);

router.post("/login", UsersController.loginUser);

router.get("/logout", UsersController.logoutUser);

router.get("/info", UsersController.infoUser);

module.exports = router;
