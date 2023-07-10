const express = require("express");
const postRoute = express.Router();
const {
  getUserPosts,
  getFeedPosts,
  getAllPosts,
  getSinglePost,
  deletePost,
  createPost,
  likePost,
  commentPost,
} = require("../controllers/postController");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");

postRoute.get("/userpost", authorizeSession, getUserPosts);
postRoute.get("/allposts", authorizeSession, getAllPosts);
postRoute.get("/followingposts", authorizeSession, getFeedPosts);
postRoute.get("/singlepost/:id", authorizeSession, getSinglePost);
postRoute.delete("/deletepost", authorizeSession, deletePost);
postRoute.post("/createpost", authorizeSession, createPost);
postRoute.post("/likepost", authorizeSession, likePost);
postRoute.post("/commentpost", authorizeSession, commentPost);
module.exports = { postRoute };
