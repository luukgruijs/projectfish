"use strict"

const jwt = require("jsonwebtoken")
const config = require("./config")

exports.verify = function(req, res, next) {
    let token = req.headers['x-access-token'] || req.params.token

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(403).send({
                    message: "failed to authenticate token"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            message: "no token provided"
        });
    }
}