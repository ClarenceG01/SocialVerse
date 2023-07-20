const express = require("express");
const replyRoute = express.Router();
const {
  likeReply,
  getRepliesToComment,
  checkLike,
} = require("../controllers/replyController");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");

replyRoute.get("/likereply/:reply_id", authorizeSession, likeReply);
replyRoute.get(
  "/repliestocomment/:comment_id",
  authorizeSession,
  getRepliesToComment
);
replyRoute.get("/checkreplylike/:reply_id", authorizeSession, checkLike);
module.exports = { replyRoute };
