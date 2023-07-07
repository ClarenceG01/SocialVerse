const express = require("express");
const postRoute = express.Router();
const {
  getUserPosts,
  getFeedPosts,
  getAllPosts,
} = require("../controllers/postController");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");

postRoute.get("/userpost", authorizeSession, getUserPosts);
postRoute.get("/allposts", authorizeSession, getAllPosts);
postRoute.get("/followingposts", authorizeSession, getFeedPosts);
module.exports = { postRoute };
