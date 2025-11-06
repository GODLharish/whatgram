import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    Username : {
        type: String, 
        required: true,
        unique: true
    }, 
    email : {
        type: String, 
        required: true,
        unique: true
    }, 
    Password : {
        type: String, 
        required: true,
        minlength : 9
    }, 
    Username : {
        type: String, 
        default: ""
    }
}, {timestamp : true}
);

const User = mongoose.model("User", userSchema);

export default User;