"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")

module.exports = (app) => {

    app.get("/users", middleware.verify, (request, response, next) => {
        rest.search(
            request,
            response,
            next,
            model.user
        )
    })

    app.post("/users", middleware.verify, (request, response, next) => {
        rest.create(
            request,
            response,
            next,
            model.user
        )
    })
}