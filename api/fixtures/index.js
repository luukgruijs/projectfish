"use strict"

const mongoose = require("mongoose")
const models = require("../models")
const config = require("../config")

exports.startup = function() {

    const user = models.user.findOne().exec()
    user.then((user) => {
        if (!user) {
            let user = new models.user
            user.name = config.name
            user.email = config.email
            user.password = config.password
            user.role = "admin"
            user.save()
        }
    })
}