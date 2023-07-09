const express = require("express");
const profileRoute = express.Router();
const { authorizeSession } = require("../middlewares/authorizeMiddleware");
const { updateProfile } = require("../controllers/profileController");

profileRoute.post("/updateprofile", authorizeSession, updateProfile);
module.exports = { profileRoute };
