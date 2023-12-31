const { createClient } = require("redis");

async function followUser(req, res, next) {
  try {
    const { pool } = req;
    const { followed_id } = req.params;
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
        .execute("UserProfile");
      let followingUsers = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetFollowingUsers");
      let followers = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetFollowers");
      res.status(200).json({
        message: "User profile retrieved",
        results: results.recordset,
        following: followingUsers.recordset,
        followers: followers.recordset,
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
    const { followed_id } = req.params;
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
async function notFollowed(req, res, next) {
  try {
    const { pool } = req;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetUsersNotFollowedByUser");
      res.status(200).json({
        message: "Users not followed by user retrieved",
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
async function allUserDetails(req, res, next) {
  try {
    const { pool } = req;
    const { user_id } = req.params;
    if (pool.connected) {
      let posts = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetUserPosts");
      let followers = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetFollowers");
      let following = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetFollowingUsers");
      let user_profile = await pool
        .request()
        .input("user_id", user_id)
        .execute("userProfile");
      res.status(200).json({
        message: "All user details retrieved",
        posts: posts.recordset,
        followers: followers.recordset,
        following: following.recordset,
        user_details: user_profile.recordset,
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
module.exports = {
  followUser,
  followCount,
  unfollowUser,
  notFollowed,
  allUserDetails,
};
