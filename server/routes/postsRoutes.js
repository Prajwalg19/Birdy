import express from "express"
import {getFeedPosts, updateLikePosts, getUserPosts, updateComments} from "../controllers/postController.js"
const router = express.Router()
router.post("/:id/like", updateLikePosts)
router.get("/:userId/posts", getUserPosts)
router.post("/:id/comments", updateComments)
router.get("/", getFeedPosts)

export default router
