import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import customError from "../utils/customError.js"
import jwt from "jsonwebtoken"
export const register = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            location,
            occupation,
            friends,
            photoPath
        } = req.body
        const passwordHash = bcrypt.hashSync(password, 10);
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: passwordHash,
            photoPath: photoPath,
            location,
            occupation,
            friends,
            viewedProfile: Math.floor(Math.random() * 1000),
            impression: Math.floor(Math.random() * 1000)
        });

        const account = await newUser.save();
        delete account._doc.password
        res.status(201).json({status: true, message: "account created successfully", value: account})
    } catch (e) {
        next(e);
    }

}



export async function logIn(req, res, next) {
    try {
        const {email, password} = req.body;
        const query = await userModel.findOne({email});
        if (!query) {
            return next(customError("User not found", 404))
        }
        const authorized = await bcrypt.compare(password, query.password)
        if (authorized) {
            const token = jwt.sign({id: query._id}, process.env.JWT_SEC_KEY, {expiresIn: "2 days"})
            const {password, ...rest} = query._doc
            res.status(200).cookie("my_cookie", token, {httpOnly: true, sameSite: 'None', secure: true, partitioned: true}).json({message: "Login successful", user: rest, token}) //
            // Browsers are becoming stricter with how they handle third-party cookies (cookies set by a domain other than the one currently being visited). The 'Partitioned' attribute is part of the effort to mitigate cross-site tracking. If a cookie is considered third-party and does not have the 'Partitioned' attribute, it might be rejected by the browser
        }
        else {
            next(customError("Wrong password or email", 403))
        }
    } catch (e) {
        next(e);
    }
}
