const dotenv = require("dotenv");
const { load } = require("nodemon/lib/config");
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
// load env
const envPath = path.resolve(__dirname, "config", ".env");
dotenv.config({ path: envPath });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const booksRouter = require("./routes/booksRouter");
app.use("/api/v1/books", booksRouter);
const usersRouter = require("./routes/usersRouter");
app.use("/api/v1/users", usersRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

const errorHandler = require("./midllewares/errorHandler");

app.use(errorHandler);

(() => {
  connectDB();
  app.listen(process.env.PORT, (err) => {
    if (!err) {
      console.log(`Server on PORT ${process.env.PORT}`);
    } else {
      process.exit(1);
    }
  });
})();
