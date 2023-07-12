const express = require("express");
const { userRoute } = require("./src/routes/userRoutes");
const session = require("express-session");
const { v4 } = require("uuid");
require("dotenv").config();
const { authorizeSession } = require("./src/middlewares/authorizeMiddleware");
const config = require("./src/config/config");
const sql = require("mssql");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

async function startApp() {
  // get pool
  try {
    const pool = await sql.connect(config);
    console.log("App connected to database");
    // create redis client and connect
    const redisClient = createClient();
    redisClient.connect();
    // create redis store
    const redisStore = new RedisStore({
      client: redisClient,
      prefix: "",
    });
    const oneDay = 1000 * 60 * 60 * 24;
    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });
    app.use(
      session({
        store: redisStore,
        secret: process.env.SECRET,
        saveUninitialized: false,
        genid: () => v4(),
        resave: true,
        rolling: true,
        unset: "destroy",
        cookie: {
          httpOnly: true,
          maxAge: oneDay,
          secure: false,
          domain: "localhost",
        },
      })
    );

    app.get("/", authorizeSession, (req, res) => {
      res.send("Home");
    });
    app.use(userRoute);
    app.get("*", (req, res) => {
      res.status(404).json({ message: "Page not found" });
    });
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
//exports
module.exports = { app };
