// add
// getAll
// getOne
// update
// remove
const BooksController = require("../controllers/BooksController");
const authVerify = require("../midllewares/authVerify");
const router = require("express").Router();
const rolesVerify = require("../midllewares/rolesVerify");

router.post("/", authVerify, rolesVerify(["ADMIN"]), BooksController.add); //only for admin

router.get("/", BooksController.getAll);

router.get("/:id", BooksController.getOne);

router.patch("/:id", BooksController.update);

router.delete("/:id", BooksController.remove);

module.exports = router;
