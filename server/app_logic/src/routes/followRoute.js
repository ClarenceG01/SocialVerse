const express = require("express");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");
const {
  followUser,
  followCount,
  unfollowUser,
} = require("../controllers/followController");
const followRoute = express.Router();

followRoute.post("/followuser", authorizeSession, followUser);
followRoute.get("/followcount", authorizeSession, followCount);
followRoute.post("/unfollowuser", authorizeSession, unfollowUser);

module.exports = { followRoute };
