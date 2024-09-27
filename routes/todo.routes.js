const express = require("express");
const todoModel = require("../models/todo.model");
const authMiddleware = require("../middlewares/auth.middleware");
const todoRouter = express.Router();

todoRouter.use(authMiddleware)

todoRouter.get('/allTodo' , async (req,res) => {
  let alltodo =  await todoModel.find({userId: req.body.userId})
  res.send({Msg: "All todo of single user" , alltodo})
})

todoRouter.post("/addTodo", async (req, res) => {
  try {
    const newTodo = new todoModel(req.body);
    await newTodo.save();
    res
      .status(201)
      .json({ msg: "Todo Created Successfully", newTodo });
  } catch (error) {
    res.status(500).json({ msg: "Error creating todo", error: error.message });
  }
});

module.exports = todoRouter;
