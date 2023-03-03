"use strict";

const userService = require("../service/userService");
const { response } = require("express");

module.exports.getUsers = (req, res, next) => {
    // console.log("🚀 ~ file: user.js:7 ~ req:", req)
    const usersId = req.swagger.params['entryNum'].value;
    console.log("🚀 ~ file: user.js:8 ~ usersId:", usersId)
    userService.getUsers(usersId)
        .then((response) => {
            res.send(response);
        })
        .catch((response) => {
            res.send(response);
        })
}

module.exports.addUsers = (req, res, next) => {
    const usersId = req.swagger.params['entryNum'].value;
    const body = req.swagger.params['body'].value;
    console.log("🚀 ~ file: user.js:22 ~ body:", body)
    userService.addUsers(usersId, body)
        .then((response) => {
            console.log("🚀 ~ file: user.js:24 ~ .then ~ response:", response)
            res.send(response);
        })
        .catch((response) => {
            res.send(response);
        })
}