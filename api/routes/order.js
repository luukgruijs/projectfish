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

        // process order
        order.then((order) => {
            if (order && order._id) {
                response.json({"message": "You allready ordered something today"})
            } else {

                // create order
                model.order.create(request.body).then((order) => {

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

                    response.json(order)
                })
            }
        })
    })
}