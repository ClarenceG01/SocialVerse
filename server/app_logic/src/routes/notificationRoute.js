const express = require("express");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");
const notificationRoute = express.Router();
const {
  getUserNotifications,
  markAsRead,
} = require("../controllers/notificationController");

notificationRoute.get("/notifications", authorizeSession, getUserNotifications);
notificationRoute.get("/setread/:notify_id", authorizeSession, markAsRead);
module.exports = { notificationRoute };
