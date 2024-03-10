import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String
})

export const User = mongoose.model('User',UserSchema);
