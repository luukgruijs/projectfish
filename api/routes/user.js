"use strict"

const model = require("../models")
const rest = require("../rest")

module.exports = (app) => {

    app.get("/users", (request, response, next) => {
        rest.search(
            request,
            response,
            next,
            model.user
        )
    })

    app.post("/users", (request, response, next) => {
        rest.create(
            request,
            response,
            next,
            model.user
        )
    })
}