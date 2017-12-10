"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")
const mailer = require("../helpers/mailer")
const config = require("../config")
const token = require("../helpers/token")

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
        middleware.guard,
        (request, response, next) => {

            const submitted_user = request.body;
            const reset_token = token.generateToken()
            submitted_user.password = Object.assign({}, {
                reset_token,
            })
 
            model.User.create(submitted_user)
            .then((user) => {
                
                let msg = {
                    "from": config.email_user,
                    "subject": 'activate your account',
                    "text": `Click the following link to activate your account: http://localhost:3000/#/set-password/${reset_token}/${user._id}`,
                    "to": `${user.name} <${user.email}>`
                }

                mailer(msg);
                return user
            })
            .then((user) => response.json(user))
            .catch(next);
    })

    app.post("/users/:id/set_password",
        (request, response, next) => {
            const user = model.User.findById(request.params.id, '+password').exec()
            user.then((user) => {

                if (!request.body.reset_token) {
                    throw errors.NO_RESET_TOKEN()
                }

                if (!user) {
                    throw thow.RESOURCE_NOT_FOUND()
                }

                if (user.password.reset_token !== request.body.reset_token) {
                    throw errors.RESET_TOKEN_MISMATCH()
                }

                if (request.body.password !== request.body.password2) {
                    throw errors.PASSWORD_MISMATCH()
                }

                user.password = Object.assign({ hash: request.body.password });
                user.save();
                
                return response.json({message: "Succesfully set password"});
            })
            .catch(next)
        }
    )

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