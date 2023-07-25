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
async function markAsRead(req, res, next) {
  try {
    const { pool } = req;
    const { notify_id } = req.params;
    if (pool.connected) {
      const results = await pool
        .request()
        .input("notify_id", notify_id)
        .execute("setSeenBy");
      res.status(200).json({
        message: "Notifications retrieved",
        results: results.recordset,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function markAllAsRead(req, res, next) {
  try {
    const { pool } = req;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      const results = await pool
        .request()
        .input("user_id", user_id)
        .execute("MarkAllNotificationsAsRead");
      res.status(200).json({
        message: "Notifications retrieved",
        results: results.recordset,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getUserNotifications, markAsRead, markAllAsRead };
