import mongoose from "mongoose";

const Schema = mongoose.Schema;

const storySchema = Schema({
    image: {
        url: String,
        filename: String
    },

    title: {
        type: String,
    },

    description: {
        type: String,
        required: true,
    }, 

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    tone: {
        type: String,
        enum: ["Romantic", "Hopeful", "Nostalgic", "Reflective"],
        required: true,
    },

    userStory: {
        type: String
    },

    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'

    },

    likes: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    comments: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    }

})

const Story = mongoose.model("Story", storySchema)

export default Story
