import customError from "../utils/customError.js"
import mongoose from "mongoose"
import userModel from "../models/userModel.js"

function resolveIdToUsers(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let ok = await userModel.findById(id);
            const {_id, firstName, lastName, location, occupation, photoPath} = ok._doc
            resolve({_id, firstName, lastName, location, occupation, photoPath})
        }
        catch (e) {
            reject(e)
        }
    })

}


export async function getUserInfo(req, res, next) {
    try {
        const docId = req.params.id // the url segement casn be accessed like this
        const query = await userModel.findOne({_id: docId})
        if (!query) {
            return next(customError("User not found", 404))
        }
        const {password, ...rest} = query._doc
        res.status(200).json({status: true, user: rest})
    } catch (e) {
        next(e)
    }
}


export const getUserFriends = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id)
        //const allFriends = await userModel.aggregate(
        //    [
        //        {
        //            $match: {
        //                "_id": req.params.id
        //            }
        //        },
        //        {
        //            $project: {
        //                "friends": 1
        //            }
        //        }
        //    ]
        //)

        const friends = await Promise.all(user.friends.map((id) => {return resolveIdToUsers(id)}))
        res.send(friends)


    } catch (e) {
        next(e);
    }

}





export const addDeleteFriend = async (req, res, next) => {
    try {
        let {id, fid} = req.params
        const user = await userModel.findById(id)
        if (user.friends.includes(fid)) {
            await userModel.updateOne({_id: id}, {$pull: {friends: fid}})
            await userModel.updateOne({_id: fid}, {$pull: {friends: id}})
        } else {
            await userModel.updateOne({_id: id}, {$push: {friends: fid}})
            await userModel.updateOne({_id: fid}, {$push: {friends: id}})
        }
        const newUser = await userModel.findById(id);
        const query = await Promise.all(newUser.friends.map((id) => {return resolveIdToUsers(id)}))
        res.status(200).json(query)

    } catch (e) {
        next(e)
    }

}


//export const allUsers = async (req, res, next) => {
//    try {
//        let users = await userModel.find({});
//        let ok = users.map((item) => {
//            delete item._doc.password
//            return item
//        })
//
//        res.status(200).send(ok)
//
//    } catch (e) {
//        next(e)
//    }
//
//
//}
