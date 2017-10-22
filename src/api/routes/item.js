"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")
const errors = require("../errors")

module.exports = (app) => {

    app.get("/items",
        middleware.verify,
        (request, response, next) => {
        const items = model.Item.find({deleted: false}).exec()
        .then((items) => {
            response.json(items)
        })
    })

    app.post("/items",
        middleware.verify,
        middleware.guard,
        (request, response, next) => {
            rest.create(
                request,
                response,
                next,
                model.Item
            )
    })

    app.post("/items/:id",
        middleware.verify,
        middleware.guard,
        (request, response, next) => {
            rest.update(
                request,
                response,
                next,
                model.Item,
                { "_id": request.params.id }
            )
    })

    app.delete("/items/:id",
        middleware.verify,
        middleware.guard,
        (request, response, next) => {

            const item = model.Item.findOne({ "_id": request.params.id }).exec()
            .then((item) => {
                if (!item) {
                    throw(errors.RESOURCE_NOT_FOUND())
                }

                item.deleted = true
                item.save()

                response.json(item)
            })
            .catch(next)
    })
}