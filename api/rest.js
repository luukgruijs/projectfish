"use strict"

const model = require("./models")

exports.search = function search(request, response, next, obj) {
    response.set("Content-Type", "application/json")

    var query = obj.find()
    let first = true

    let onData = (data) => {
        response.write(JSON.stringify(data))
        first = false
    }

    let onEnd = () => {
        response.end(first ? "[]" : "]")
    }

    query
        .cursor()
        .on("data", onData)
        .on("end", onEnd)
}