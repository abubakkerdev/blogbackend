const express = require("express");
const _ = express.Router();
const auth = require("./auth")
const blogPost = require("./blogPost")

_.use("/auth", auth);
_.use("/blog", blogPost);
  
module.exports = _;