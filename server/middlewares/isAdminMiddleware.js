const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const isAdmin = await User.findOne({ email: email });

  if (isAdmin.roles !== "admin") {
    throw new Error("You Are not an admin");
  } else {
    next();
  }
});

module.exports = isAdmin;
