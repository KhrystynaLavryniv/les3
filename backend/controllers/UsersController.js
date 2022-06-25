const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

class UsersController {
  registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Add all fields");
    }

    const isExists = await User.findOne({ email });
    if (isExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // зробити захешований пароль
    const solt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, solt);
    console.log(hashPassword);
    // створити юзера
    const user = await User.create({ name, email, password: hashPassword });
    user.token = this.generateToken(user._id);
    await user.save();
    if (user) {
      res.status(201).json({
        message: "ok",
        code: 201,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

  loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Add all fields");
    }
    // let token = null;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = this.generateToken(user._id);
      await user.save();
      res.status(200).json({
        message: "ok",
        code: 200,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalad credentials");
    }
  });

  logoutUser = asyncHandler(async (req, res) => {
    res.send("logoutUser");
  });

  infoUser = asyncHandler(async (req, res) => {
    res.send("infoUser");
  });

  generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "8h" });
  };
}

module.exports = new UsersController();
