const { createClient } = require("redis");

async function followUser(req, res, next) {
  try {
    const { pool } = req;
    const { followed_id } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("follower_id", user_id)
        .input("followed_id", followed_id)
        .execute("FollowUser");
      res.status(200).json({
        message: "User followed",
        results: results.recordset,
      });
    } else {
      res.status(500).json({
        message: "Server error",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error.originalError.info.message);
  }
}
async function followCount(req, res, next) {
  try {
    const { pool } = req;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetUserFollowCounts");
      res.status(200).json({
        message: "Follow count retrieved",
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
async function unfollowUser(req, res, next) {
  try {
    const { pool } = req;
    const { followed_id } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("follower_id", user_id)
        .input("followed_id", followed_id)
        .execute("UnfollowUser");
      res.status(200).json({
        message: "User unfollowed",
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
module.exports = { followUser, followCount, unfollowUser };
