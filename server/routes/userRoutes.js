import express from "express"
import {addDeleteFriend, getUserFriends, getUserInfo} from "../controllers/userController.js"
import verifyToken from "../utils/verify.js"
const router = express.Router()
router.get("/:id/friends", verifyToken, getUserFriends)
router.post("/:id/:fid", verifyToken, addDeleteFriend)
router.get("/:id", verifyToken, getUserInfo) // the root segement is case insensitive
//router.get("/getAllUsers", verifyToken, allUsers)

export default router

