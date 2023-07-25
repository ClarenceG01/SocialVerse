const express = require("express");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");
const {
  followUser,
  followCount,
  unfollowUser,
  notFollowed,
  allUserDetails,
} = require("../controllers/followController");
const followRoute = express.Router();

followRoute.get("/followuser/:followed_id", authorizeSession, followUser);
followRoute.get("/followcount", authorizeSession, followCount);
followRoute.get("/unfollowuser/:followed_id", authorizeSession, unfollowUser);
followRoute.get("/accountsnotfollowed", authorizeSession, notFollowed);
followRoute.get("/alluserdetails/:user_id", authorizeSession, allUserDetails);
followRoute.get("/followers/:user_id", authorizeSession, allUserDetails);

module.exports = { followRoute };
