const { Schema, model } = require("mongoose");

const bookSchema = Schema(
  {
    author: {
      type: String,
      required: [true, "Mongoose. Fild author is required"],
    },

    title: {
      type: String,
      required: [true, "Mongoose. Fild author is required"],
    },

    pages: { type: Number, default: 1 },
    user: "",

    picture: { type: String, default: "No image provided" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("book", bookSchema);
