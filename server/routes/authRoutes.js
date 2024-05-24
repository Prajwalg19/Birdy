import express from "express"
import {logIn} from "../controllers/authController.js"
import verifyToken from "../utils/verify.js"
const router = express.Router()
router.post("/login", logIn)
export default router
