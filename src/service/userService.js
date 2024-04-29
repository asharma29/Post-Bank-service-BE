'use strict';

const mongoModel = require("../model/userModel");

module.exports.getUsers = function (userId) {
    // console.log("🚀 ~ file: userService.js:6 ~ usersId:", usersId)
    return new Promise(async (resolve, reject) => {
        try {
            if (userId) {
                mongoModel.find({ entryNum: userId }, (err, docs) => {
                    if (!err) {
                        return resolve(docs);
                    } else {
                        return resolve("docs not found")
                    }
                })
            } else {
                mongoModel.find((err, docs) => {
                    if (!err) {
                        return resolve(docs);
                    } else {
                        return resolve("docs not found")
                    }
                })
            }
        } catch (error) {

        }
    })

}

module.exports.addUsers = function (usersId, body) {
    console.log("🚀 ~ file: userService.js ~ line 34 ~ body", body)
    return new Promise((resolve, reject) => {
        try {
            mongoModel.find({
                $or: [
                    {
                        name: body.name
                    },
                    {
                        email: body.email
                    },
                    {

                        entryNum: body.entryNum

                    },
                ]
            })
                .then(user => {
                    console.log("user53" , user)
                    if (user.length >= 1) {
                        console.log("🚀 ~ file: userService.js ~ line 55 ~ returnnewPromise ~ user.length", user.length)
                        return reject({
                            "status": 500,
                            "message": "Users Already Exsit"
                        })
                    } else {
                        console.log("body56" , body)
                        let  user = new mongoModel(body);
                         console.log("🚀 ~ file: userService.js ~ line 63 ~ returnnewPromise ~ user", user)
                        user.save();
                        return resolve(user)
                    }
                })
                         

        } catch (error) {
            console.log("error", error)

        }
                

    })
}