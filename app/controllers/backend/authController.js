const userModel = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailSend = require("../../utils/emailSend");
const saltRounds = 10;
const privateKey = process.env.PRIVATE_KEY;
 
const auth = {
  register(req, res) {
    const { uname, email, password } = req.body;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      let token = jwt.sign(email, privateKey, { algorithm: "HS384" });
      const users = new userModel({
        uname,
        email,
        password: hash,
        image: req.file.filename,
      });

      users.save();
      emailSend(email, token);

      res.send({
        success: "Data upload",
      });
    });
  },

  tokenCheck(req, res) {
    const token = req.params.id;
    jwt.verify(token, privateKey, async function (err, decoded) {
      if (decoded) {
        const userUpdate = await userModel.findOneAndUpdate(
          { email: decoded },
          { emailVerified: true },
          { new: true }
        );

        res.redirect("http://localhost:1010/api/v1/backend/auth/loginpage");
      } else {
        res.send({ error: "token unverified" });
      }
    });
  },

  loginPage(req, res) {
    res.redirect("http://localhost:5173");
  },

  async login(req, res) {
    const { email, password } = req.body;

    const userInfo = await userModel.findOne({ email });

    if (userInfo) {
      if (userInfo.emailVerified) {
        bcrypt.compare(password, userInfo.password, function (err, result) {
          if (result) {

            console.log(userInfo);

           let userLogin = ( Date.now() + 7*24 *60*60) / 1000

            res.send({
              success: "ok",
              data: {
                uname: userInfo.uname,
                email: userInfo.email,
                image: userInfo.image,
                userId: userInfo._id,
                userLogin: userLogin,
                login: true
              },
            });


          } else {
            res.send({
              error: "info wrong password",
            });
          }
        });
      } else {
        res.send({
          error: "info wrong email false",
        });
      }
    } else {
      res.send({
        error: "info wrong email",
      });
    }
  },
};

module.exports = auth;
