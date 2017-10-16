"use strict"

const mongoose = require("../mongoose")
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
            user.disabled = false
            user.save()
        }
    })

    const settings = models.settings.findOne().exec()
    settings.then((settings) => {
        if (!settings) {
            let settings = new models.settings
            settings.budget = 0
            settings.save()
        }
    })
}