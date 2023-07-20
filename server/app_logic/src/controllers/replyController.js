const { createClient } = require("redis");
async function likeReply(req, res, next) {
  try {
    const { pool } = req;
    const { reply_id } = req.params;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("reply_id", reply_id)
        .input("user_id", user_id)
        .execute("LikeReply");
      res.status(200).json({
        message: "Reply liked",
        results: results.recordset,
      });
    } else {
      res.status(500).json({
        message: "Server error",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
// get replies of a comment
async function getRepliesToComment(req, res, next) {
  try {
    const { pool } = req;
    const { comment_id } = req.params;
    if (pool.connected) {
      let comment = await pool
        .request()
        .input("comment_id", comment_id)
        .execute("GetCommentById");
      let results = await pool
        .request()
        .input("comment_id", comment_id)
        .execute("GetCommentReplies");
      res.status(200).json({
        message: "Replies fetched",
        comment: comment.recordset,
        results: results.recordset,
      });
    } else {
      res.status(500).json({
        message: "Server error",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function checkLike(req, res, next) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const { reply_id } = req.params;
      const user_id = req.session?.user.user_id;
      let response = await pool
        .request()
        .input("reply_id", reply_id)
        .input("user_id", user_id)
        .execute("GetLikesByReplyAndUser");
      res.status(200).json({
        success: true,
        message: "Post liked",
        response: response.recordset.length,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { likeReply, getRepliesToComment, checkLike };
