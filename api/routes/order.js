"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")
const startOfDay = require("date-fns/start_of_day")

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

        // check if user already ordered today
        const order = model.order.findOne({user: request.body.user})
            .where({"created_at": {
                    $gte: startOfDay(Date.now())
                }
            })
            .exec()

        order.then((order) => {
            if (order && order._id) {
                response.status(400).send({"message": "You allready ordered something today"})
            } else {
                rest.create(
                    request,
                    response,
                    next,
                    model.order
                )
            }
        })
    })
}