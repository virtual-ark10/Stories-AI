import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    story: {
        type: Schema.Types.ObjectId,
        ref: "Story"
    }
}, {timestamps: true})

const Comment = mongoose.Model("Comment", commentSchema);

export default Comment;