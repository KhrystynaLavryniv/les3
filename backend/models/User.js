const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Mongoose. Fild name is required"],
    },

    email: {
      type: String,
      required: [true, "Mongoose. Fild email is required"],
      //   unique: true,
    },

    password: {
      type: String,
      required: [true, "Mongoose. Fild password is required"],
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("user", userSchema);
