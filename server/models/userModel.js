import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true, min: 2, max: 50},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, min: 8},
        photoPath: {type: String, default: ""},
        location: {type: String},
        occupation: {type: String},
        friends: {type: Array},
        viewedProfile: Number,
        impression: Number
    },
    {timestamps: true}
)

const userModel = mongoose.model("user", userSchema)
export default userModel

