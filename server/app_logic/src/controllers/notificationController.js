const { createClient } = require("redis");

// notifications for logged in user
async function getUserNotifications(req, res, next) {
  try {
    const { pool } = req;
    console.log(req.session?.user.user_id);
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_to_notify", user_id)
        .execute("GetNotificationsByUserId");
      res.status(200).json({
        message: "Notifications retrieved",
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
module.exports = { getUserNotifications };
