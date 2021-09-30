const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userHandeler = require("./routeHandeler/userHandeler");
const mongoose = require("mongoose");

// init code
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// mongoose
mongoose
  .connect("mongodb://localhost:27017/auth_user", {})
  .then((res) => {
    console.log("server is connect");
  })
  .catch((err) => {
    console.log(err);
  });

// get router
app.get("/", (req, res) => {
  res.json({
    message: "get router",
  });
});

// router
app.use("/", userHandeler);

// server
const port = 4000;
app.listen(port, () => {
  console.log(`server is running port ${port}`);
});
