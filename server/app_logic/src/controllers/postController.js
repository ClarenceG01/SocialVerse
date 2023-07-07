const { createClient } = require("redis");
// posts of the logged in user
async function getUserPosts(req, res, next) {
  try {
    const { pool } = req;
    console.log(req.session?.user.user_id);
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetUserPosts");
      res.status(200).json({
        message: "Posts retrieved",
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
// posts feed (posts of the followers of the logged in user)
async function getFeedPosts(req, res, next) {
  try {
    const { pool } = req;
    console.log(req.session?.user.user_id);
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetFollowedUsersPosts");
      res.status(200).json({
        message: "Posts retrieved",
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
async function getAllPosts(req, res, next) {
  try {
    const { pool } = req;
    if (pool.connected) {
      let results = await pool.request().execute("GetAllPosts");
      res.status(200).json({
        message: "Posts retrieved",
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
module.exports = { getUserPosts, getFeedPosts, getAllPosts };
