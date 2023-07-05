const express = require("express");
const userRoute = require("./src/routes/userRoutes");
const session = require("express-session");
const { v4 } = require("uuid");
require("dotenv").config();
const { authorizeSession } = require("./src/middlewares/authorizeMiddleware");

const oneDay = 1000 * 60 * 60 * 24;
const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    genid: () => v4(),
    resave: true,
    rolling: true,
    cookie: {
      httpOnly: true,
      maxAge: oneDay,
      secure: false,
    },
  })
);
app.use(userRoute);
app.get("/", authorizeSession, (req, res) => {
  res.send("Home");
});
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
