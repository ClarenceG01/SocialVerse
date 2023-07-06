const express = require("express");
const postRoute = express.Router();
const { getUserPosts } = require("../controllers/postController");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");

postRoute.get("/userpost", authorizeSession, getUserPosts);

module.exports = { postRoute };
