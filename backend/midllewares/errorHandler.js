const errorHandler = (error, req, res, next) => {
  const code = res.statusCode ? res.statusCode : 500;
  const mode = process.env.NODE_ENV === "production" ? null : error.stack;

  if (error.message.includes("Cast to ObjectId")) {
    error.message = "Не вірний формат ID";
  }

  res.status(code).json({
    message: error.message,
    stack: mode,
  });
};

module.exports = errorHandler;
