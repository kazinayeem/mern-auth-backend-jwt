const express = require("express");
const router = express.Router();
const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/regester", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(500).json({
        error: "User was already insert",
      });
    }

    const hash_password = await bcrypt.hash(password, 10);

    const usernew = new UserModel({
      name: name,
      email: email,
      password: hash_password,
    });

    const result = await usernew.save();
    res.status(200).json({
      message: "User was insert successffull",
     
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(500).json({
        error: "user not found ",
      });
    }

    const ismatchpassword = await bcrypt.compare(password, user.password);

    if (!ismatchpassword) {
      return res.status(500).json({
        error: "password not match",
      });
    }

    const token = jwt.sign({ _id: user.id }, "jsonwebtoken", {
      expiresIn: "1days",
    });

    res.status(200).json({
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
});

// get

router.get("/get", auth, async (req, res) => {
  console.log(req.users);
  try {
    const user = await UserModel.findById(req.users._id).select({
      _id: 0,
      password: 0,
    });
    res.json({
      user,
    });
  } catch (error) {
    res.json({
      error: "error",
    });
  }
});
module.exports = router;
