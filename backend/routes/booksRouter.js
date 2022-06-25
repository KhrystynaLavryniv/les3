// add
// getAll
// getOne
// update
// remove
const BooksController = require("../controllers/BooksController");
const router = require("express").Router();

router.post("/", BooksController.add);

router.get("/", BooksController.getAll);

router.get("/:id", BooksController.getOne);

router.patch("/:id", BooksController.update);

router.delete("/:id", BooksController.remove);

module.exports = router;
