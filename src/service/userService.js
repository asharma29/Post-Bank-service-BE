'use strict';

const mongoModel = require("../model/userModel");

module.exports.getUsers = function (userId)  {
    // console.log("🚀 ~ file: userService.js:6 ~ usersId:", usersId)
    return new Promise(async (resolve , reject) => {
        try {
            if(userId){
                console.log("🚀 ~ file: userService.js:10 ~ returnnewPromise ~ usersId:", userId)
                mongoModel.find({entryNum: userId} , (err ,docs) => {
                    console.log("🚀 ~ file: userService.js:12 ~ mongoModel.find ~ docs:", docs)
                    console.log("🚀 ~ file: userService.js:12 ~ mongoModel.find ~ err:", err)
                    if(!err){
                        return resolve(docs);
                    } else {
                        return resolve("docs not found")
                    }
                })
            } else {
                mongoModel.find((err, docs) => {
                    if(!err){
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