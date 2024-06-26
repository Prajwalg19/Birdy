import mongoose from "mongoose"
const postSchema = mongoose.Schema({
    userId: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    location: {type: String},
    description: {type: String},
    postPicture: {type: String},
    userPic: {type: String},
    likes: {
        type: Map, // maps are key value pairs. It is different from object in some ways like :
        // - keys in object are restricted to only String but in maps keys can be of any datatype
        // - maps maintain the order of insertion
        // - maps can be set with a certain size which is not possible with object
        // - maps are created like so new Map([["name", 23], [true, '231'], ["hello" , "world"]])
        of: Boolean
    },
    comments: {type: Array, default: []}

}, {timestamps: true})

const postModel = mongoose.model("post", postSchema);
export default postModel;
