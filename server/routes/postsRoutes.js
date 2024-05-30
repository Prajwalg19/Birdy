import express from "express"
import {getFeedPosts, updateLikePosts, getUserPosts} from "../controllers/postController.js"
const router = express.Router()
router.post("/:id/like", updateLikePosts)
router.get("/:userId/posts", getUserPosts)
router.get("/", getFeedPosts)

export default router
