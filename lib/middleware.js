"use strict"

const jwt = require("jsonwebtoken")
const config = require("./config")
const errors = require("./errors")

exports.verify = function(req, res, next) {
    let token = req.headers['x-access-token'] || req.params.token

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return next(errors.SESSION_EXPIRED())
            } else {

                req.decoded = decoded;
                next();
            }
        });
    } else {
        return next(errors.NO_TOKEN())
    }
}

exports.guard = function(req, res, next) {
    let token = req.headers['x-access-token'] || req.params.token
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return next(errors.SESSION_EXPIRED())
            } else {
                const user = decoded;
                if (user.role !== 'admin') {
                    return next(errors.INSUFFICIENT_PERMISSIONS())
                }
                next()
            }
        });
    } else {
        return next(errors.NO_TOKEN())
    }
}