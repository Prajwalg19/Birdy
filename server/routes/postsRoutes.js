import express from "express"
const router = express.Router()
router.get("/", getFeedPosts)
router.post("/:id/like", updateLikePosts)
router.post("/:userId/posts", getUserPosts)
