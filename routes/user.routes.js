const express = require("express");
const userModel = require("../models/userModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth.middleware");
const userRouter = express.Router();
var salt = bcrypt.genSaltSync(10);



userRouter.post("/signup", async (req, res) => {
  try {
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    let newUser = new userModel(req.body);
    await newUser.save();
    res.status(200).json({ msg: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const userData = await userModel.findOne({ name: req.body.name });

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      userData.password
    );
    if (isPasswordValid) {
      var token = jwt.sign({ userId: userData.id }, "shhhhh");
      res.status(200).json({ msg: "Login Succesfully", token });
    } else {
      res.status(401).json({ msg: "Incorrect Password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        msg: "Something went wrong. Please try again later.",
        error: error.message,
      });
  }
});

module.exports = userRouter;
