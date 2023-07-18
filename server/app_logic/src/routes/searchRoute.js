const express = require("express");
const searchRoute = express.Router();
const { search } = require("../controllers/searchController");
const { authorizeSession } = require("../middlewares/authorizeMiddleware");

searchRoute.get("/search/:searchTerm", authorizeSession, search);
module.exports = { searchRoute };
