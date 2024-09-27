const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: { type: String },
    mobile: { type: String },
    password: { type: String },
    dob: { type: String },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
