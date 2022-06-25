const Book = require("../backend/models/Book");
class RepozytoryBooks {
  getAll = async () => {
    return await Book.find({});
  };
}
module.exports = new RepozytoryBooks();
