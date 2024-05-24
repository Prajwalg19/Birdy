import express from "express"
import {getFeedPosts, updateLikePosts, getUserPosts} from "../controllers/postController.js"
const router = express.Router()
router.get("/", getFeedPosts)
router.post("/:id/like", updateLikePosts)
router.post("/:userId/posts", getUserPosts)

export default router
