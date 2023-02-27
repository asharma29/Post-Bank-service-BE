"use strict";

const userService = require("");
const { response } = require("express");

module.exports.getUsers = (req , res ,next) => {
    const usersId = req.swagger.params['entryNum'].value;
    userService.getUsers(usersId)
    .then((response) => {
        res.send(response);
    })
    .catch((response) => {
        res.send(response);
    })
}