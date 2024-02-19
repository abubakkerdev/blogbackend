const express = require("express");
const multer = require("multer");
const path = require("node:path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);

    const fileName = file.originalname
      .replace(fileExt, "")
      .toLowerCase()
      .split(" ")
      .join("-");
 
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, fileName + uniqueSuffix + fileExt);
  },
});

const upload = multer({ storage: storage });
const {blogCreate, blogAll, singleBlog, blogUpdate} = require("../../../controllers/backend/blogController");
const _ = express.Router(); 
 
_.post("/create", upload.single("image_post"), blogCreate);
_.post("/update", upload.single("photo_upload"), blogUpdate);
_.get("/all", blogAll);
_.get("/singleblog/:id", singleBlog);
   
module.exports = _;