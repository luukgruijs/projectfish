"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")
const mailer = require("../helpers/mailer")
const config = require("../config")

module.exports = (app) => {

    app.get("/users",
        middleware.verify,
        (request, response, next) => {

        const users = model.User.find({disabled: false}).exec()
        .then((users) => {
            response.json(users)
        })
        .catch(next)
    })

    app.post("/users",
        middleware.verify,
        (request, response, next) => {
            model.User.create(request.body)
            .then((user) => {
                let msg = {
                    "from": config.email_sender,
                    "subject": 'activate your account',
                    "text": 'this is a test email',
                    "to": `${user.name} <${user.email}>`
                }

                return mailer(msg);
            }).then(() => {
                response.send("ok")
            }).catch(next)

    })

    app.post("/users/:id",
        middleware.verify,
        middleware.guard,
        (request, response, next) => {
            rest.update(
                request,
                response,
                next,
                model.User,
                { "_id": request.params.id }
            )
    })
}