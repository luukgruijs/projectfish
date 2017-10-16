"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")

module.exports = (app) => {

    app.get("/settings", middleware.verify, (request, response, next) => {
        rest.search(
            request,
            response,
            next,
            model.Settings
        )
    })

    app.post("/settings/:id", middleware.verify, (request, response, next) => {
        rest.update(
            request,
            response,
            next,
            model.Settings
        )
    })
}