"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")
const mailer = require("../helpers/mailer")
const config = require("../config")

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
        model.user.create(request.body).then((user) => {
            let msg = {
                "from": config.email_sender,
                "subject": 'activate your account',
                "text": 'this is a test email',
                "to": `${user.name} <${user.email}>`
            }

            return mailer(msg);
        })
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