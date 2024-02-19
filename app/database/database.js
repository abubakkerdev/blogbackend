const mongoose = require("mongoose");
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const databaseName = process.env.DB_DATABASE;

const databaseConnect = () => {
  mongoose
    .connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.hqzhvx0.mongodb.net/${databaseName}?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connected!"));
};

module.exports = databaseConnect;
