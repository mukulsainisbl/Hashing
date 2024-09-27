const mongoose = require("mongoose");
const TodoSchema = mongoose.Schema(
  {
    title: { type: String },
    status:{type:Boolean, default:false},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
  },
  {
    versionKey: false,
  }
);

const todoModel = mongoose.model("Todo", TodoSchema);

module.exports = todoModel;
