const express = require("express");
const commentRoute = express.Router();
const {
  replyToComment,
  likeComment,
} = require("../controllers/commentController");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");

commentRoute.post("/replytocomment", authorizeSession, replyToComment);
commentRoute.post("/likecomment", authorizeSession, likeComment);

module.exports = { commentRoute };
