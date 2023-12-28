const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const formidable = require("express-formidable");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require('cookie-parser')
const Session = require('./utils/session.util');

const app = express();

// app config
app.use("/media", express.static("public"));
app.use(cors());
app.use(formidable({ multiples: true }));


// view config
app.engine(".html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

//Setup Sessions
app.use(Session);
// cookie parser
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
  transports: ["websocket", "polling"],
  allowEIO3: true,
});

module.exports = {
  server,
  io,
  app,
  express,
};
