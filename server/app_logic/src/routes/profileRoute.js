const express = require("express");
const profileRoute = express.Router();
const { authorizeSession } = require("../middlewares/authorizeMiddleware");
const {
  updateProfile,
  updatePassword,
  getLoggedInUser,
} = require("../controllers/profileController");

profileRoute.post("/updateprofile", authorizeSession, updateProfile);
profileRoute.post("/updatepassword", authorizeSession, updatePassword);
profileRoute.get("/loggedinuser/:user_id", authorizeSession, getLoggedInUser);
module.exports = { profileRoute };
