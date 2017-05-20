"use strict"

const jwt = require("jsonwebtoken")
const config = require("../config")
const model = require("../models")
const rest = require("../rest")

module.exports = (app) => {

    app.post("/authenticate", (request, response, next) => {
        const user = model.user.findOne({Email: req.body.email}).exec();

        user.then((user) => {
            const valid_password = user.comparePassword(req.body.password)

            if (valid_password) {
                let token = jwt.sign({
                    "name": user.name,
                    "email": user.email,
                }, config.secret, {
                    "expiresIn": "12h"
                })

                res.json({
                    token,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role
                })

            } else {
                response.json({"message": "Your email or password is incorrect"})
            }
        })

    })
}