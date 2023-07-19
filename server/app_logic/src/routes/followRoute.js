const express = require("express");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");
const {
  followUser,
  followCount,
  unfollowUser,
  notFollowed,
} = require("../controllers/followController");
const followRoute = express.Router();

followRoute.get("/followuser/:followed_id", authorizeSession, followUser);
followRoute.get("/followcount", authorizeSession, followCount);
followRoute.post("/unfollowuser", authorizeSession, unfollowUser);
followRoute.get("/accountsnotfollowed", authorizeSession, notFollowed);

module.exports = { followRoute };
