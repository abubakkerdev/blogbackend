const fs = require("node:fs");

const userFromValidation = (req, res, next) => {
  const { uname, email, password, image_upload } = req.body;

  if (
    email == "" ||
    uname == "" ||
    (password == "" && req.file.filename != "")
  ) {
    fs.unlinkSync("./public/images/" + req.file.filename);
  }

  if (email == "") {
    return res.send({
      error: {
        email: "Give your Email!",
      },
    });
  }

  if (uname == "") {
    return res.send({
      error: {
        uname: "Give your Uname!",
      },
    });
  }

  if (password == "") {
    return res.send({
      error: {
        password: "Give your Password!",
      },
    });
  }

  if (image_upload == "") {
    return res.send({
      error: {
        image: "Give your Photo!",
      },
    });
  }

  if (uname != "" && email != "" && password != "" && image_upload != "") {
    next();
  }
};

module.exports = userFromValidation;
