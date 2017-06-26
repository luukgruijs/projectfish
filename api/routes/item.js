"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")

module.exports = (app) => {

    app.get("/items", middleware.verify, (request, response, next) => {
        const items = model.item.find({deleted: false}).exec()

        items.then((items) => {
            console.log(items)
            if (items) {
                response.json(items)
            }
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

        item.then((item) => {
            if (item) {
                item.deleted = true
                item.save()

                response.json({"message": "Succesfully deleted item", "item": item})
            }
        })
    })
}