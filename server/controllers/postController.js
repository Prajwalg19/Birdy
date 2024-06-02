import postModel from '../models/postsModel.js';
import postsModel from '../models/postsModel.js'
import userModel from "../models/userModel.js"

export const createPost = async (req, res, next) => {
    try {
        const {userId, postPhoto, description} = req.body
        const user = await userModel.findById(userId);
        const newPost = new postsModel({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPic: user.photoPath,
            postPicture: postPhoto,//postPicture: req.file.originalname, if i was using multer
            likes: {},
            comments: []

        });
        await newPost.save();
        const allPosts = await postsModel.find().sort({createdAt: -1});
        res.status(201).json(allPosts)

    } catch (e) {
        next(e);
    }


}

export const getFeedPosts = async (req, res, next) => {

    try {
        const allPosts = await postsModel.find({}).sort({"createdAt": -1});
        res.status(200).json(allPosts);
    } catch (e) {
        next(e)
    }


}

export const getUserPosts = async (req, res, next) => {
    try {
        const {userId} = req.params
        const userPosts = await postsModel.find({userId}).sort({"createdAt": -1})
        res.status(200).json(userPosts)
    } catch (e) {
        next(e)
    }


}

export const updateLikePosts = async (req, res, next) => {
    try {
        const {id} = req.params
        const {userId} = req.body
        const post = await postsModel.findById(id)
        if (post.likes.get(userId)) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        const newDoc = await post.save();
        res.status(200).json(newDoc)

    } catch (e) {
        next(e);
    }
}


export const updateComments = async (req, res, next) => {
    try {
        const {id} = req.params
        const {userId, commentDescription, userPic, firstName, lastName, location} = req.body
        //const post = await postsModel.findById(id)
        const newDoc = await postsModel.updateOne({_id: id}, {$push: {comments: [{userId, commentDescription, userPic, firstName, lastName, location}]}})
        const doc = await postModel.findById(id);
        res.status(200).json(doc)

    } catch (e) {
        next(e);
    }
}



export const searchPosts = async (req, res, next) => {
    try {
        const id = req.query?.searchTerm || ""

        const query = await postsModel.find({
            $or:
                [
                    {description: {$regex: id, $options: "i"}},
                    {firstName: {$regex: id, $options: "i"}},
                    {lastName: {$regex: id, $options: "i"}},
                ]
        }
        )
        res.json(query)

    } catch (e) {
        next(e);

    }

}
