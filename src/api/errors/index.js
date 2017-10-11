"use strict"

const error_codes = require("./codes")

/**
 * Prototype defines the prototype of a custom error type
 */
let Prototype = Object.create(Error.prototype)

/**
 * toJSON converts an error to a JSON representation
 *
 * @param {Error} err - An error created by the Constructor
 *
 * @return {Object} A string representation of the JSON public error
 */
function toJSON(err) {
    let details = {}
    if (typeof err.details === "object" && err.details != null) {
        details = err.details
        delete details.source
    }

    return {
        "code": err.code,
        "details": details,
        "message": error_codes[err.code].message,
        "timestamp": Date.now()
    }
}
exports.toJSON = toJSON

/**
 * is tells whether a given 'something' is a custom Error
 *
 * @param {Mixed} err - anything that is questionnable
 *
 * @return {Boolean} True if the given parameter is a custom Error
 */
exports.is = (err) => {
    if (typeof err !== "object" || err == null) {
        return false
    }

    return Object.getPrototypeOf(err) === Prototype
}


/**
 * hasName tells whether a given 'something' is a custom Error & has a specific name
 *
 * @param {String} name - expected name of the error
 * @param {Mixed} err - anything that is questionnable
 *
 * @return {Boolean} True if the given `err` parameter is a Custom Error & has the given name
 */
exports.hasName = (name, err) => {
    if (!exports.is(err)) {
        return false
    }

    return err.name === name
}

/**
 * Constructor constructs a new custom error type associated to a specific error code
 * and with possibly some additional details.
 *
 * @param {Number} code - An error code from errors/codes module.
 * @param {Object} [details] - An optional details object
 * @param {Mixed} [hint] - An optional debug hint for internal purpose only
 *
 * @return {Error} An error type
 */
function Constructor(code, details, hint) {
    let description = error_codes[code]
    if (typeof description !== "object" || description == null) {
        let err = exports.UNEXPECTED_ERROR(null, { code })
        description = error_codes[err.code]
    }
    let name = description.name
    let status = description.http_status
    let message = description.message
    let stack = [name]
        .concat((new Error()).stack.split("\n").slice(2))
        .join("\n")

    return Object.create(Prototype, {
        "code": {
            "enumerable": true,
            "value": Number(code)
        },
        "details": {
            "enumerable": true,
            "value": details
        },
        "hint": {
            "enumerable": true,
            "value": hint
        },
        "message": {
            "enumerable": true,
            "value": message
        },
        "name": {
            "enumerable": true,
            "value": name
        },
        "stack": {
            "enumerable": true,
            "value": stack
        },
        "status": {
            "enumerable": true,
            "value": status
        }
    })
}
exports.Constructor = Constructor

/**
 * handler defines an Express error handler
 *
 * @param {Mixed} err - An error or something thrown by a previous middleware
 * @param {Request} req - A request object from Express
 * @param {Response} res - A response object from Express
 * @param {Function} UNUSED_next - The callback function from express
 *
 * @return {Null} Nothing
 */
exports.handler = (err, req, res, UNUSED_next) => {
    // NOTE The function never uses 'next' arguments but 4 arguments need to be define
    // so that express understand that this middleware should actually be called as an
    // error handler.
    if (typeof err === "object" && err != null && err.name === "ValidationError") {
        let fields = Object.keys(err.errors)
        let name = /(.*) validation/.exec(err.message)[1].toLowerCase().replace(/ /g, "_")
        err = exports.INVALID_RESOURCE({ fields, name })
    }

    if (typeof err === "object" && err != null && err.name === "SyntaxError") {
        err = exports.MALFORMED_REQUEST()
    }

    if (typeof err === "object" && err != null && Number(err.code) === 11000 && err.name === "MongoError") {
        let resource = /duplicate key error collection:\s*\w*\.(\w*)s/.exec(err.message)
        resource = resource == null ? "unknown" : resource[1]

        let field = /index: (\w*)_\d?/.exec(err.message)
        field = field == null ? "unknown" : field[1]

        err = exports.DUPLICATE_KEY({ field, resource }, err.message)
    }

    if (typeof err === "object" && err != null && err.name === "MongoError") {
        err = exports.DATABASE_FAILURE(null, err)
    }

    if (typeof err === "object" && err != null && err.name === "CastError") {
        err = exports.MALFORMED_PARAMETERS([err.path])
    }

    if (!exports.is(err) || error_codes[err.code] == null) {
        err = exports.UNEXPECTED_ERROR()
    }

    let details = err.details == null ? "<no details>" : JSON.stringify(err.details)
    let hint = typeof err.hint === "string" ? err.hint : err.hint != null ? JSON.stringify(err.hint) : "<no hint>"

    return res.status(err.status).json(toJSON(err))
}

/**
 * ERR_<name> defines a slew of constructors shortcut to create new custom errors from
 * their name with a predefined custom code
 *
 * @param {Object} [details] - An optional details object
 *
 * @return {Error} An error type
 */
Object.keys(error_codes).reduce((exports, code) => Object.assign(exports, {
    [`${error_codes[code].name}`]: (details, hint) => Constructor(code, error_codes[code].format(details), hint)
}), exports)