const User = require("../models/User");
const Role = require("../models/Role");
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
    const userRole = await Role.create({ value: "ADMIN" });
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      roles: [userRole.value],
    });
    console.log(userRole.value);

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
          roles: user.roles,
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
      user.token = this.generateToken(user._id, user.roles);
      await user.save();
      res.status(200).json({
        message: "ok",
        code: 200,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
          roles: user.roles,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalad credentials");
    }
  });

  logoutUser = asyncHandler(async (req, res) => {
    // console.log(req.headers.authorization);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const [Bearer, token] = req.headers.authorization.split(" ");

      console.log(token);
      try {
        const { id: user_id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const candidate = await User.findById(user_id);
        // console.log(user);
        candidate.token = null;
        await candidate.save();
        res.status(200).json({ message: "Logout succesful" });
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });

  infoUser = asyncHandler(async (req, res) => {
    res.status(200).json({
      data: req.user,
    });
  });

  generateToken = (id, roles) => {
    return jwt.sign({ id, roles }, process.env.JWT_SECRET_KEY, {
      expiresIn: "8h",
    });
  };
}

module.exports = new UsersController();
