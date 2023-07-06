const express = require("express");
require("dotenv").config();
const { postRoute } = require("./src/routes/postRoute");
const app = express();

app.use(express.json());
app.use(postRoute);
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
