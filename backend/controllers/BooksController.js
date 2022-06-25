const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");
const RepozytoryBooks = require("../../repozytory/RepozytoryBooks");
class BooksController {
  add = asyncHandler(async (req, res) => {
    // throw new Error("Test помилки");
    if (!req.body.author) {
      res.status(400);
      throw new Error("Поле автор відсутнє");
    }

    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: "Ok",
      message: "create book",
      data: newBook,
    });
  });

  getAll = asyncHandler(async (req, res) => {
    // const books = await Book.find({});
    const books = await RepozytoryBooks.getAll();
    console.log(books);
    res.status(200).json({
      status: "Ok",
      data: books,
      qty: books.length,
    });
  });

  getOne = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(400);
      throw new Error(`Відсутня книга з таким ${req.params.id} ID`);
    }

    res.status(200).json({
      status: "Ok",
      data: book,
    });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(401);
      throw new Error("Book not found");
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Ok",
      data: updatedBook,
    });
  });

  remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      res.status(401);
      throw new Error("Book not found");
    }

    await book.remove();
    res.status(200).json({
      status: "Ok",
      data: id,
    });
  });
}

module.exports = new BooksController();
