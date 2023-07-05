const express = require("express");
const postRoute = express.Router();
const { getPostsById } = require("../controllers/post");

postRoute.get("/posts/:id", getPostsById);
