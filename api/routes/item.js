"use strict"

const model = require("../models")
const rest = require("../rest")

module.exports = (app) => {

    app.get("/items", (request, response, next) => {
        rest.search(
            request,
            response,
            next,
            model.item
        )
    })
}