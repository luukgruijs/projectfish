"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")

module.exports = (app) => {

    app.get("/orders", middleware.verify, (request, response, next) => {
        rest.search(
            request,
            response,
            next,
            model.order
        )
    })

    app.post("/order", middleware.verify, (request, response, next) => {
        rest.create(
            request,
            response,
            next,
            model.order
        )
    })
}