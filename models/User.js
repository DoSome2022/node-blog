import mongoose from "mongoose";

const UserSchame = new mongoose.Schema({

    email:{
        type: String,
    },
    password:{
        type: String,
    },
},{timestamps:true})

const User = mongoose.models.User || mongoose.model("Users", UserSchame);

export default User