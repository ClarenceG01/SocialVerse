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
      let password = await pool
        .request()
        .input("user_id", user_id)
        .execute("GetPassword");
      let passwordFromDB = password.recordset[0].password;
      console.log(`passwordFromDB: ${passwordFromDB}`);
      console.log(`old_password: ${old_password}`);
      console.log(`hashedPassword: ${hashedPassword}`);
      console.log(`hashed_old_password: ${await bcrypt.hash(old_password, 8)}`);
      let is_match = await bcrypt.compare(old_password, passwordFromDB);
      if (is_match) {
        let results = await pool
          .request()
          .input("user_id", user_id)
          .input("old_password", old_password)
          .input("new_password", hashedPassword)
          .execute("UpdateUserPassword");
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

module.exports = { updateProfile, updatePassword };
