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
        success: true,
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
// posts feed (posts of the following of the logged in user)
async function getFeedPosts(req, res, next) {
  try {
    const { pool } = req;
    console.log(req.session?.user.user_id);
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetFollowingUsersPosts");
      res.status(200).json({
        success: true,
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
        success: true,
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
async function getSinglePost(req, res, next) {
  try {
    const { pool } = req;
    const post_id = req.params.id;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("post_id", post_id)
        .execute("GetPostByID");
      let comments = await pool
        .request()
        .input("post_id", post_id)
        .execute("GetPostComments");
      res.status(200).json({
        success: true,
        message: "Posts retrieved",
        results: results.recordset,
        comments: comments.recordset,
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
async function deletePost(req, res, next) {
  try {
    const { pool } = req;
    const { post_id } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("post_id", post_id)
        .input("user_id", user_id)
        .execute("DeletePost");
      res.status(200).json({
        message: "Post deleted",
        results: results.recordset,
      });
    } else {
      res.status(500).json({
        message: "Server error",
      });
    }
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
}
async function createPost(req, res, next) {
  try {
    const { pool } = req;
    const { post_text, link1, link2 } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("post_text", post_text)
        .input("user_id", user_id)
        .input("link1", link1)
        .input("link2", link2)
        .execute("CreatePost");
      if (results.rowsAffected[0] > 0) {
        res.status(200).json({
          success: true,
          message: "Post created",
          results: results.recordset,
        });
      }
    } else {
      res.status(500).json({
        message: "Server error",
      });
    }
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
}
// like and unlike post
async function likePost(req, res, next) {
  try {
    const { pool } = req;
    const { post_id } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("post_id", post_id)
        .input("user_id", user_id)
        .execute("LikePost");

      res.status(200).json({
        success: true,
        message: "Post liked",
        results: results.recordset,
      });
    } else {
      res.status(500).json({
        message: "Server error",
      });
    }
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
}
async function checkLike(req, res, next) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const { post_id } = req.body;
      const user_id = req.session?.user.user_id;
      let response = await pool
        .request()
        .input("post_id", post_id)
        .input("user_id", user_id)
        .execute("GetLikesByPostAndUser");
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
async function commentPost(req, res, next) {
  try {
    const { pool } = req;
    const { post_id, comment } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("post_id", post_id)
        .input("user_id", user_id)
        .input("comment", comment)
        .execute("CreateComment");
      res.status(200).json({
        success: true,
        message: "Post commented",
        results: results.recordset,
      });
    } else {
      res.status(500).json({
        message: "Server error",
      });
    }
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
}
module.exports = {
  getUserPosts,
  getFeedPosts,
  getAllPosts,
  getSinglePost,
  deletePost,
  createPost,
  likePost,
  checkLike,
  commentPost,
};
