const express = require("express");
const todoModel = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middleware");

const todoRouter = express.Router();
todoRouter.use(authMiddleware)

todoRouter.post("/addTodo", async (req, res) => {
  try {
    const newTodo = new todoModel(req.body);
    await newTodo.save();
    res.status(200).json({ msg: "Todo created succesfully", newTodo });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = todoRouter;




