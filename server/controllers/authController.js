import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import customError from "../utils/customError.js"
export const signUp = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            photoPath,
            location,
            occupation,
            friends,
        } = req.body
        const passwordHash = bcrypt.hashSync(password, 10);
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: passwordHash,
            photoPath,
            location,
            occupation,
            friends,
            viewedProfile: Math.floor(Math.random() * 1000),
            impression: Math.floor(Math.random() * 1000)
        });

        const account = await newUser.save();
        res.status(201).json({status: true, message: "account created successfully", value: account})
    } catch (e) {
        next(e);
    }

}
