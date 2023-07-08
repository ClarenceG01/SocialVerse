const { createClient } = require("redis");

async function replyToComment(req, res, next) {
  try {
    const { pool } = req;
    const { comment_id, content } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("comment_id", comment_id)
        .input("user_id", user_id)
        .input("content", content)
        .execute("CreateReply");
      res.status(200).json({
        message: "Reply posted",
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
async function likeComment(req, res, next) {
  try {
    const { pool } = req;
    const { comment_id } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("comment_id", comment_id)
        .input("user_id", user_id)
        .execute("LikeComment");
      res.status(200).json({
        message: "Comment liked",
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
module.exports = { replyToComment, likeComment };
