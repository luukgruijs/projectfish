"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")
const startOfDay = require("date-fns/start_of_day")
const errors = require("../errors")

module.exports = (app) => {

    app.get("/orders", middleware.verify, (request, response, next) => {
        rest.search(
            request,
            response,
            next,
            model.order
        )
    })

    app.post("/order",
        middleware.verify,
        (request, response, next) => {

        // check if user already ordered today
        // check if user is not disabled
        Promise.all([
            model.order.findOne({user: request.body.user}).where({"created_at": {$gte: startOfDay(Date.now())}}).exec(),
            model.user.findOne({_id: request.body.user}).exec(),
        ]).then((values) => {

            const order = values[0];
            const user = values[1];

            if (user.disabled) {
                throw(errors.USER_DISABLED())
            }

            if (order && order._id) {
                throw(errors.ONE_ORDER_PER_DAY())
            }

            // create order
            model.order.create(request.body)
            .then((order) => {

                // create lunch order if none exists
                const lunch_order = model.lunch_order.findOne()
                    .where({"created_at": {
                            $gte: startOfDay(Date.now())
                        }
                    })

                lunch_order.then((lunch_order) => {
                    if (lunch_order && lunch_order._id) {

                        // there already is an order today. update this one
                        lunch_order.orders.push(order)
                        lunch_order.save()
                    } else {

                        // no orders yet today, create new one
                        model.lunch_order.create({
                            "created_at": new Date(),
                            "orders": [order._id]
                        })
                    }
                })

                return response.json(order)
            })
        })
    })
}