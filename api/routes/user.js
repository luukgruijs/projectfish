"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")

module.exports = (app) => {

    app.get("/users", middleware.verify, (request, response, next) => {

        const users = model.user.find({disabled: false}).exec()

        users.then((users) => {
            if (users) {
                response.json(users)
            }
        })
    })

    app.post("/users", middleware.verify, (request, response, next) => {
        rest.create(
            request,
            response,
            next,
            model.user
        )
    })

    app.post("/users/:id", middleware.verify, (request, response, next) => {
        rest.update(
            request,
            response,
            next,
            model.user,
            { "_id": request.params.id }
        )
    })
}