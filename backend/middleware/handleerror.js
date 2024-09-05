function handleError(error, req, res, next) {
console.log(error);
  let status = 500;
  let message = "Internal Server Error";

  if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.errors.map((el) => el.message).join(", ");
  } else if (error.message == "InvalidLogin") {
    status = 400;
    message = "Please input email or password";
  } else if (error.message == "LoginError") {
    status = 401;
    message = "Invalid email or password";
  } else if (error.message == "NotFound") {
    status = 404;
    message = `Data not found`;
  } else if (error.message === "UNAUTHENTICATED") {
    status = 401;
    message = "please login first";
  } else if (error.message === "FORBIDDEN") {
    status = 403;
    message = "you don't have permission";
  } else if (error.name === "JsonWebTokenError") {
    status = 401;
    message = "invalid token";
  }




  res.status(status).json({
    message,
  });
}

module.exports = handleError;
