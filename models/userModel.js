const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    password:{type:String, required:true, unique:true},
    mobile:{type:String},
    todos:[{type:mongoose.Schema.Types.ObjectId, ref:"Todo"}]
},{
    versionKey: false
})

const userModel = mongoose.model('User' , UserSchema)


module.exports = userModel