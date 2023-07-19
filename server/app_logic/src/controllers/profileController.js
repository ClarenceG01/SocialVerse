const { createClient } = require("redis");
const bcrypt = require("bcrypt");
async function updateProfile(req, res, next) {
  try {
    const { pool } = req;
    const { fullname, bio, profile_pic } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_id", user_id)
        .input("full_name", fullname)
        .input("bio", bio)
        .input("profile_picture", profile_pic)
        .execute("UpdateUserProfile");
      res.status(200).json({
        message: "Profile Updated",
        results: results.recordset,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function updatePassword(req, res, next) {
  try {
    const { pool } = req;
    const { old_password, new_password } = req.body;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let hashedPassword = await bcrypt.hash(new_password, 8);
      let user_password = req.session?.user.password;
      console.log(`user_password: ${user_password}`);
      let is_match = await bcrypt.compare(old_password, user_password);
      console.log(`is_match: ${is_match}`);
      if (is_match) {
        let results = await pool
          .request()
          .input("user_id", user_id)
          .input("old_password", old_password)
          .input("new_password", hashedPassword)
          .execute("UpdatePassword");
        res.status(200).json({
          message: "Password Updated",
          results: results.recordset,
        });
      } else {
        res.status(500).json({
          message: "Password does not match",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
async function getLoggedInUser(req, res, next) {
  try {
    const { pool } = req;
    const { user_id } = req.params;
    if (pool.connected) {
      const results = await pool
        .request()
        .input("user_id", user_id)
        .execute("getLoggedInUser");
      console.log(results);
      res.send(results);
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
module.exports = { updateProfile, updatePassword, getLoggedInUser };
