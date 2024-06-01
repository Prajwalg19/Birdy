import express from "express"
import {getFeedPosts, updateLikePosts, getUserPosts, updateComments, createPost} from "../controllers/postController.js"
import verifyToken from "../utils/verify.js"
const router = express.Router()
router.use("/createPost", createPost)
router.post("/:id/like", verifyToken, updateLikePosts)
router.get("/:userId/posts", verifyToken, getUserPosts)
router.post("/:id/comments", verifyToken, updateComments)
router.get("/", getFeedPosts)

export default router
