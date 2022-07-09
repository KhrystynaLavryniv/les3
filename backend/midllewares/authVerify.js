const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authVerify = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const [Bearer, token] = req.headers.authorization.split(" ");

    try {
      const { id: user_id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //   const candidate = await User.findById(user_id);
      //   req.user = {
      //     name: candidate.name,
      //     email: candidate.email,
      //   };

      req.user = await User.findById(user_id).select(
        "-password -token -createdAt -updatedAt"
      );

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = authVerify;
