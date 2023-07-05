const express = require("express");
const userRoute = require("./src/routes/userRoutes");
const session = require("express-session");
const { v4 } = require("uuid");
require("dotenv").config();
const { authorizeSession } = require("./src/middlewares/authorizeMiddleware");

const oneDay = 1000 * 30;
const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    genid: () => v4(),
    secure: true,
    resave: true,
    rolling: true,
    cookie: {
      httpOnly: true,
      maxAge: oneDay,
    },
  })
);
app.use(userRoute);
app.get("/", authorizeSession, (req, res) => {
  res.send("Home");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
