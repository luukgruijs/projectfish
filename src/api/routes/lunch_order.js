"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")

module.exports = (app) => {

    app.get("/lunchorders", middleware.verify, (request, response, next) => {
        rest.search(
            request,
            response,
            next,
            model.lunch_order
        )
    })

    app.get("/lunchorders/:id", middleware.verify, (request, response, next) => {
        rest.get(
            request,
            response,
            next,
            model.lunch_order
        )
    })
}