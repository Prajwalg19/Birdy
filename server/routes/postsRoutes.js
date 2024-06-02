import express from "express"
import {getFeedPosts, updateLikePosts, getUserPosts, updateComments, createPost, searchPosts} from "../controllers/postController.js"
import verifyToken from "../utils/verify.js"
const router = express.Router()
router.use("/createPost", createPost)
router.post("/:id/like", verifyToken, updateLikePosts)
router.get("/:userId/posts", verifyToken, getUserPosts)
router.post("/:id/comments", verifyToken, updateComments)
router.get("/", getFeedPosts)
router.get("/search/", verifyToken, searchPosts)

export default router
