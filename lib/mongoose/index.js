"use strict"

const config = require("../config")
const mongoose = require("mongoose")

const BACKOFF_MAX_RETRY = 5
const BACKOFF_DEFAULT_SLOT_TIME = 200

// Use native promises, because Mongoose promises suck.
// See http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise

let delay = 200
let n_retry = 1
mongoose.connection.on("error", (err) => {
    if (n_retry <= BACKOFF_MAX_RETRY) {
        console.log(err)(`retrying to connect in ${delay}ms`)
        setTimeout(() => {
            mongoose.connect(config.database)
        }, delay)
    }
    else {
        console.log("too many retries, can't connect to mongo")
    }
})

mongoose.connect(config.database)

module.exports = mongoose
module.exports.mongodb = require("mongodb")
