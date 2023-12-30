const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const isBothMiddleware = AsyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const isBoth = await User.findOne({ email: email });
  if ((isBoth.roles == "admin" || isBoth.roles == "instructor") === true) {
    next();
  } else {
    throw new Error(
      "if You want to upload You have to role as admin or instrture"
    );
  }
});
module.exports = isBothMiddleware;
