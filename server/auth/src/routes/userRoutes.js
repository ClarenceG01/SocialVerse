const express = require("express");
const userRoute = express.Router();
const {
  userRegister,
  userLogin,
  userLogout,
} = require("../controllers/userController");
const { newUserMiddleware } = require("../middlewares/registerUserMiddleware");
const { user } = require("../config/config");

userRoute.post("/register", newUserMiddleware, userRegister);
userRoute.post("/login", userLogin);
userRoute.get("/logout", userLogout);

module.exports = userRoute;
