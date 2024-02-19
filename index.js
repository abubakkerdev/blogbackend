require("dotenv").config();
const express = require("express");
const http = require("node:http");
const socketIO = require("socket.io");
const cors = require("cors");
const databaseConnect = require("./app/database/database");
const app = express();
const server = http.createServer(app);
const route = require("./app/routers");
const workSocket = require("./app/socket/workSocket");
const port = process.env.APP_PORT;
const imageUrl = process.env.BASE_URL;
  
app.use(cors());
app.use(`${imageUrl}/images`, express.static(`${__dirname}/public/images/`));
 
const io = socketIO(server, {
  cors: {
    origin: "https://blogfrontend-mu.vercel.app",
  },
});

io.on("connection", (socket) => {
  workSocket(io, socket);
});

app.use(express.json());
databaseConnect();

app.use(route);

app.get("/", function (req, res) {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log("Server is running");
});
