const express = require("express");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");
const notificationRoute = express.Router();
const {
  getUserNotifications,
} = require("../controllers/notificationController");

notificationRoute.get("/notifications", authorizeSession, getUserNotifications);
module.exports = { notificationRoute };
