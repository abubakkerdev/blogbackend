const express = require("express");
const _ = express.Router();
const rootUrl = process.env.BASE_URL;
const api = require("./api");

_.use(rootUrl, api);
_.use(rootUrl, (req, res) => res.json({ error: "Route is not find!" }));

module.exports = _;
