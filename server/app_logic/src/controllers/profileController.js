const { createClient } = require("redis");
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
module.exports = { updateProfile };
