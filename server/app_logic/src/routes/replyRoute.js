const express = require("express");
const replyRoute = express.Router();
const {
  likeReply,
  getRepliesToComment,
} = require("../controllers/replyController");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");

replyRoute.post("/likereply", authorizeSession, likeReply);
replyRoute.get(
  "/repliestocomment/:comment_id",
  authorizeSession,
  getRepliesToComment
);
module.exports = { replyRoute };
