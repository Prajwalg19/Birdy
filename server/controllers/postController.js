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
        const allPosts = await postsModel.find();
        res.status(201).json(allPosts)

    } catch (e) {
        next(e);
    }


}

export const getFeedPosts = async (req, res, next) => {

    try {
        const allPosts = await postsModel.find({});
        res.status(200).json(allPosts);
    } catch (e) {
        next(e)
    }


}

export const getUserPosts = async (req, res, next) => {
    try {
        const {userId} = req.params
        const userPosts = await postsModel.find({userId})
        res.status(200).json(userPosts)
    } catch (e) {
        next(e)
    }


}

export const updateLikePosts = async (req, res, next) => {
    try {
        const {id} = req.params
        const {userId} = req.body
        const post = await postsModel.findById({_id: id})
        if (post.like.get(userId)) {
            post.like.delete(userId);
        } else {
            post.like.set(userId, true);
        }
        const newDoc = await post.save();
        res.status(200).json(newDoc)

    } catch (e) {
        next(e);
    }
}
