import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: String,
        enum: ["admin", "author", "reader"],
        default: "reader",
    },

    avatar: {
        url: String,
        filename: String
    }

}, {timestamps: true})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema);

export default User;