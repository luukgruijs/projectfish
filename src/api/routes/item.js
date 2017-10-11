"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")
const errors = require("../errors")

module.exports = (app) => {

    app.get("/items",
        middleware.verify,
        (request, response, next) => {
        const items = model.item.find({deleted: false}).exec()
        .then((items) => {
            response.json(items)
        })
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

    app.delete("/items/:id", middleware.verify, (request, response, next) => {

        const item = model.item.findById(request.params.id).exec()
        .then((item) => {
            if (!item) {
                throw(errors.RESOURCE_NOT_FOUND())
            }

            item.deleted = true
            item.save()

            response.json(item)
        })
    })
}