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
        format: nothing
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
    },
    107: {
        http_status: http_status.BAD_REQUEST,
        message: "You did not submit a csv, please submit a csv",
        name: "NOT_A_CSV",
        format: nothing,
    },
    108: {
        http_status: http_status.BAD_REQUEST,
        message: "You CSV headers are not correct, They should be name, category and price",
        name: "ITEM_CSV_HEADERS",
        format: nothing,
    },
    109: {
        http_status: http_status.BAD_REQUEST,
        message: "Your CSV headers are not correct, They should be name, email and role",
        name: "USER_CSV_HEADERS",
        format: nothing,
    },
    110: {
        http_status: http_status.BAD_REQUEST,
        message: "Please provide a user with your order",
        name: "NO_ORDER_USER",
        format: nothing,
    },
    111: {
        http_status: http_status.UNAUTHORIZED,
        message: "You're session is expired, please login again",
        name: "SESSION_EXPIRED",
        format: nothing,
    },
    112: {
        http_status: http_status.UNAUTHORIZED,
        message: "Your request contained no api token, please login to obtain one",
        name: "NO_TOKEN",
        format: nothing,
    },
    113: {
        http_status: http_status.BAD_REQUEST,
        message: "Your submission contains data that should be unique",
        name: "DUPLICATE_KEY",
        format: nothing,
    }
}