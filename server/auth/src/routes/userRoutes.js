const express = require("express");
const userRoute = express.Router();
const {
  userRegister,
  userLogin,
  userLogout,
  deleteAccount,
} = require("../controllers/userController");
const { newUserMiddleware } = require("../middlewares/registerUserMiddleware");
const { user } = require("../config/config");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");

userRoute.post("/register", newUserMiddleware, userRegister);
userRoute.post("/login", userLogin);
userRoute.post("/logout", userLogout);
userRoute.delete("/deleteaccount", authorizeSession, deleteAccount);

module.exports = { userRoute };
