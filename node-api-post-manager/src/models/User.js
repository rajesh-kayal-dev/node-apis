import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken:{
            type: String
        },
        role:{
            type:String,
            enum:["user", "admin"],
            default: "user"
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);