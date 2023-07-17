const express = require("express");
const commentRoute = express.Router();
const {
  replyToComment,
  likeComment,
  checkLike,
} = require("../controllers/commentController");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");

commentRoute.post("/replytocomment", authorizeSession, replyToComment);
commentRoute.post("/likecomment", authorizeSession, likeComment);
commentRoute.post("/checkcommentlike", authorizeSession, checkLike);

module.exports = { commentRoute };
