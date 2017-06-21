"use strict"

const jwt = require("jsonwebtoken")
const config = require("../config")
const model = require("../models")
const rest = require("../rest")

module.exports = (app) => {

    app.post("/authenticate", (req, res, next) => {
        const user = model.user.findOne({email: req.body.email}).select("name email password role").exec();

        user.then((user) => {
            // first check if password is already set
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
                    "role": user.role,
                    "_id": user._id
                })
            } else {
                res.status(400).send({"message": "Your email or password is incorrect", "error": "credentials_incorrect"})
            }
        })

    })
}