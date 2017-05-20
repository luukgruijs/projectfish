"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")

module.exports = (app) => {

    app.get("/items", middleware.verify, (request, response, next) => {
        rest.search(
            request,
            response,
            next,
            model.item
        )
    })

    app.post("/items", middleware.verify, (request, response, next) => {
        rest.create(
            request,
            response,
            next,
            model.item
        )
    })

    app.post("/items/:id", middleware.verify, (request, response, next) => {
        rest.update(
            request,
            response,
            next,
            model.item,
            { "_id": request.params.id }
        )
    })
}