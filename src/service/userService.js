'use strict';

const mongoModel = require("../model/userModel");

module.exports.getUsers = (userId) => {
    return new Promise(async (resolve , reject) => {
        try {
            if(userId){
                mongoModel.find({entryNum: userId} , (err ,docs) => {
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