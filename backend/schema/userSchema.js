import e from "express";
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})


const User = mongoose.model('User', userSchema);

export default User;