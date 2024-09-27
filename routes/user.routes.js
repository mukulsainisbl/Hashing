const express = require("express");
const userModel = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

//
const salt = bcrypt.genSaltSync(2);

userRouter.post("/signup", async (req, res) => {
    try {
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({ msg: "User Created Successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user", error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
    try {
        const userData = await userModel.findOne({ name: req.body.name });
    
        if (!userData) {
          return res.status(404).json({ msg: "User not found" });
        }
    
        const isPasswordValid = bcrypt.compareSync(req.body.password, userData.password);
        
        if (isPasswordValid) {
          var token = jwt.sign({ userId: userData._id }, 'shhhhh');
          res.status(200).json({ msg: "Login Successful" , token } );
        } else {
          res.status(401).json({ msg: "Incorrect Password" });
        }
      } catch (error) {
        res.status(500).json({ msg: "Something went wrong. Please try again later.", error: error.message });
      }
});

module.exports = userRouter;
