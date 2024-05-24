import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import customError from "./customError.js"
dotenv.config()

export default async function verifyToken(req, res, next) {
    try {

        const token = req.cookies.my_cookie // this only works because i am using the cookie-parser library which populates the cookies with an object of all the cookies and thier values
        if (!token) {
            return next("Unauthorized", 401)
        }
        jwt.verify(token, process.env.JWT_SEC_KEY, (err, decrypted) => {
            if (err) {
                return next(customError("Forbidden: Access token expired", 403))
            }
            req.userIdFromCookie = decrypted
        })
        next()

    } catch (e) {
        next(e)
    }

}
