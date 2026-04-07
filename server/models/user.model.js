import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    credits: {
        type: Number,
        default: 100
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;