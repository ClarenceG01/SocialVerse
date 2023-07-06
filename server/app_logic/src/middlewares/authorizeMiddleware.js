const { createClient } = require("redis");

async function authorizeSession(req, res, next) {
  try {
    const redisClient = createClient();
    redisClient.connect();
    console.log("Connected to Redis");
    let cookie = req.headers["cookie"];
    let sessionID = cookie.substring(16, 52);
    let session = await redisClient.get(sessionID);
    let real_session = JSON.parse(session);
    const authorized = real_session?.authorized;
    if (session && authorized) {
      req.session = real_session;
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "login to proceed",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { authorizeSession };
