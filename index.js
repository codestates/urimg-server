require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const http = require("http");
const userRouter = require('./routes/user');
const imgRouter = require('./routes/img');

const PORT = process.env.PORT || 4000;

app.use(express.json({
  limit : "50mb"
}));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ limit:"50mb", extended: false }));

app.use('/user', userRouter);
app.use('/img', imgRouter);

let server;
server = http.createServer(app);
server = app.listen(PORT, () => {
  console.log("Hello");
});

module.exports = server;
