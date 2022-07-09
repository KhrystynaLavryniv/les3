// ADMIN
// MODERATOR
// COPYWRITER
// CUSTOMER
// USER
// ["USER", "COPYWRITER"];
// ["ADMIN", "CUSTOMER"];
// ["MODERATOR"];

const { Schema, model } = require("mongoose");
const roleSchema = Schema(
  {
    value: {
      type: String,
      default: "USER",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("role", roleSchema);
