const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  status: { type: Boolean, default: false },
},{
    versionKey: false
});

const todoModel = mongoose.model('todo' , TodoSchema)

module.exports = todoModel