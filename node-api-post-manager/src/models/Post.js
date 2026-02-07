import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            default: []
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

PostSchema.index({ title: "text" }); // for faster serch

export default mongoose.model("Post", PostSchema);