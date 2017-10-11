"use strict"

const http_status = require("./http_status")
const nothing = () => null
const fatal_error = "Unexpected error: if the error persists, please contact an administrator, " +
    "quoting the code and timestamp of this error"

module.exports = {
    100: {
        http_status: http_status.INTERNAL_SERVER_ERROR,
        message: fatal_error,
        name: "UNEXPECTED_ERROR",
        format: nothing
    },
    101: {
        http_status: http_status.NOT_FOUND,
        message:
            "The requested page can't be found.",
        name: "PAGE_NOT_FOUND",
        format: nothing
    },
    102: {
        http_status: http_status.BAD_REQUEST,
        message:
            "The submitted username or password is invalid",
        name: "INVALID_CREDENTIALS",
        format: nothing
    },
    103: {
        http_status: http_status.NOT_FOUND,
        message:
            "The requested resource can't be found",
        name: "RESOURCE_NOT_FOUND",

        /**
         * @param {Object} opts - The format options
         * @param {String} opts.name - The name of the missing resource
         * @param {String} [opts.id] - The id of the missing resource
         *
         * @return {Object} The formatted details
         */
        format: (opts) => {
            if (opts.id == null) {
                return { "resource": opts.name }
            }

            return {
                "resource": opts.name,
                "_id": opts.id.toString()
            }
        }
    },
    104: {
        http_status: http_status.FORBIDDEN,
        message: "Your user is disabled. Please contact an administrator",
        name: "USER_DISABLED",
        format: nothing,
    },
    105: {
        http_status: http_status.BAD_REQUEST,
        message: "You can only create one order per day",
        name: "ONE_ORDER_PER_DAY",
        format: nothing,
    },
    106: {
        http_status: http_status.FORBIDDEN,
        message: "You don't have enough permissions to perform this action",
        name: "INSUFFICIENT_PERMISSIONS",
        format: nothing,
    }
}