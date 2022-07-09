const dotenv = require("dotenv");
const { load } = require("nodemon/lib/config");
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
console.log(exphbs);
// load env
const envPath = path.resolve(__dirname, "config", ".env");
dotenv.config({ path: envPath });

const app = express();
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const booksRouter = require("./routes/booksRouter");
app.use("/api/v1/books", booksRouter);
const usersRouter = require("./routes/usersRouter");
app.use("/api/v1/users", usersRouter);
app.get("/contact", (req, res) => {
  res.render(contact);
});

app.post("/send", (req, res) => {
  req.body.name;
  res.render(contact);
});

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
