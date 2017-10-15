    "use strict"

const jwt = require("jsonwebtoken")
const config = require("../config")
const model = require("../models")
const errors = require("../errors")

module.exports = (app) => {

    app.post("/authenticate", (req, res, next) => {
        const user = model.user.findOne({email: req.body.email, disabled: false}).select("name email password role").exec();
        user.then((user) => {

            if (!user) {
                throw(errors.INVALID_CREDENTIALS())
            }

            // first check if password is set
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
                throw(errors.INVALID_CREDENTIALS())
            }
        })
        .catch(next)
    })
}