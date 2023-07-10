const express = require("express");
const profileRoute = express.Router();
const { authorizeSession } = require("../middlewares/authorizeMiddleware");
const {
  updateProfile,
  updatePassword,
} = require("../controllers/profileController");

profileRoute.post("/updateprofile", authorizeSession, updateProfile);
profileRoute.post("/updatepassword", authorizeSession, updatePassword);
module.exports = { profileRoute };
