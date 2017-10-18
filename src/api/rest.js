"use strict"

const model = require("./models")

const MAX_LIMIT = 10000
const DEFAULT_LIMIT = 2000

/**
 * isNotInteger checks if a provided value not an integer
 *
 * @param {Mixed} value - Value to check
 *
 * @return {Boolean} Returns true if its NOT an integer; False otherwise
 */
let isNotInteger = (value) =>
    isNaN(value) ||
    Number(value) !== parseInt(value, 10) ||
    !Number.isSafeInteger(Number(value))

/**
 * isExistingField checks if a provided value is an actual field, existing
 * in the schema which is going to be fetched
 *
 * @param {Mixed} value - Value to check
 * @param {Object} operation - operation, which is being started. e.g. Model.find(), Model.count()
 * Used for determining which schema is being addressed, such that we can check the availabiltiy of
 * the field on it
 *
 * @return {Boolean} Returns true if it exists; False otherwise
 */
let isExistingField = (value, operation) => Object.keys(operation.schema.paths).indexOf(value) !== -1

/**
 * isReference checks if a provided value is an actual field
 * of the schema and is a reference to another document. Also works for Array of references.
 * Used for determine if _populate is valid
 *
 * @param {Mixed} value - Value to check
 * @param {Object} operation - operation, which is being started. e.g. Model.find(), Model.count()
 * Used for determining which schema is being addressed, such that we can check the availability and type
 * of the field
 *
 * @return {Boolean} Returns true if the type is ObjectID; False otherwise
 */
let isReference = (value, operation) => {
    if (typeof operation.schema.tree[value].ref !== "undefined") {
        return true // refs
    }
    else if (operation.schema.paths[value].caster &&
        operation.schema.paths[value].caster.instance === "ObjectID") {
        return true // arrayrefs
    }

    return false
}

/**
 * isValid is an object, consisting of validator functions used for all meta filters.
 * Used to ensure that a given filter has valid type and format. Throws MALFORMED_PARAMETERS
 * if a given value is not found valid
 *
 */
let isValid = {
    "limit": (value) => {
        if (isNotInteger(value) || Number(value) < 0 || Number(value) > MAX_LIMIT) {
            //throw errors.MALFORMED_PARAMETERS(["query._limit"])
        }
    },
    "populate": (values, operation) => {
        values.forEach((value) => {
            if (!isExistingField(value, operation) || !isReference(value, operation)) {
                // throw errors.MALFORMED_PARAMETERS(["query._populate"])
            }
        })
    },
    "skip": (value) => {
        if (isNotInteger(value) || Number(value) < 0) {
           // throw errors.MALFORMED_PARAMETERS(["query._skip"])
        }
    },
    "sort": (value, operation) => {
        if (!isExistingField(value, operation)) {
            // throw errors.MALFORMED_PARAMETERS(["query._sort"])
        }
    }
}

/**
 * parsePopulate converts any weird or non standard populate values to a array of
 * interperet value. It accepts:
 *
 * + separated lists
 * , separated lists
 *   separated lists
 * and lists
 *
 * @param {Mixed} value - The value to parse
 * @return {String[]} A list of string to populate
 */
function parsePopulate(value) {
    if (Array.isArray(value)) {
        return value
    }

    if (typeof value !== "string") {
        return [value]
    }

    // NOTE Attempt to interpret the value as a list of token-separated names.
    // First token to match is considered, in the following order:
    //    - `, `
    //    - `,`
    //    - ` `
    //    - `+`
    //
    // For instance:
    //    - "transaction+card" => ["transaction", "card"]
    //    - "user agent, patate" => ["user agent", "patate"]
    //
    const values = [value.split("+"), value.split(" "), value.split(","), value.split(", ")]
        .filter((x) => x.length > 1)
        .pop()

    return values == null ? [value] : values
}

/**
 * @typedef {Function} Meta filter functions
 *
 * @property {String} key - Property of a Model, which is being filtered against
 * @property {Mixed} value - Object containing current filters collected so far
 * @property {Function} query - Query operation, to which the `limit`, `sort`, `populate`
 * will be piped
 */
let meta_filters = {
    "limit": (value, query) => {
        isValid.limit(value)
        query.limit(Number(value))
    },
    "populate": (value, query) => {
        const values = parsePopulate(value)
        isValid.populate(values, query)
        query.populate(values.join(" "))
    },
    "skip": (value, query) => {
        isValid.skip(value)
        query.skip(Number(value))
    },
    "sort": (value, query) => {
        let convertSort = (val) => {
            let obj = {}
            // `-field` => `{ field: -1 }`
            if (val.substring(0, 1) === "-") {
                val = val.substring(1)
                obj[val] = -1
            }
            //  `field` => `{ field:  1 }`
            else {
                obj[val] = 1
            }

            return obj
        }

        if (Array.isArray(value)) {
            value = value.reduce((obj, val) => {

                obj = convertSort(val, obj)

                return obj
            }, {})
        }
        else {
            value = convertSort(value)
        }

        // Validate all sort keys
        Object.keys(value).forEach((key) => {
            isValid.sort(key, query)
        })

        query.sort(value)
    }
}

/**
 * addOrExtend handles properly combining filters by creating groups
 * as "$and: [filter1, filter2]" when there are multiple ones with the same key.
 * Used for getting a single object of filters based on query parameters & additional
 * filters provided as paramater of a restjs function
 *
 * @param {filter} filter - new filter to add/extend the existing ones with
 * @param {Object} filters - Existing filters
 *
 * @return {Object} filters - Filters after being extended with the new one
 */
function addOrExtend(filter, filters) {
    let filter_key = Object.keys(filter)[0]

    // Key found in the existing filters? -> create/extend group
    if (Object.keys(filters).indexOf(filter_key) !== -1) {
        let filter_value = filters[filter_key]

        // group exists? -> extend it
        if (Array.isArray(filter_value) && filter_value.length > 0) {
            filter_value = filter_value
                .concat({ [filter_key]: filter[filter_key] })
        }
        else { // no group? -> create one
            filters[filter_key] = [
                { [filter_key]: filters[filter_key] }, // existing one
                { [filter_key]: filter[filter_key] } // new one
            ]
        }
    }
    else { // Doesn't exist? Just add it
        filters[filter_key] = filter[filter_key]
    }

    return filters
}

/**
 * @typedef {Object} filter
 *
 * @property {String} key - Property of a Model, which is being filtered against
 * @property {Object} filter - Filter value, in the format of Mongoose
 */

/**
 * transformParameters handles mapping the received query parameters
 * to the right formatting of filters according to Mongoose notation. Allows different modes,
 * depending on the type of call (get, count, search), since not all filters are always
 * possible
 *
 * @param {Object} query - Query object as retreived from express request
 * @param {Object} operation - Mongoose db operation such as db.find(), db.findById, etc
 * @param {Object} filters - Filters specified upon invoking rest.js
 *
 * @return {Object} query - Mongoose query object. Varies per operation
 */
exports.transformParameters = function transformParameters(query, operation) {
    let filters = {}
    let query_filters = {}

    /**
     * for db operations(_limit, _populate, _sort):
     *      - validate their type and format (numbers, existing fields, etc)
     *      - pipe them to the query operation
     * for query parameters:
     *      - convert them to filter notation
     *      - combine them in $and groups for repeating keys
     *      - combine with (possibly) additional filters (same fashion)
     *      - set default `limit` to DEFAULT_LIMIT in case its not provided as lower value
     */
    Object.keys(query).forEach((key) => {
        let value = query[key]

        // `_populate` -> `populate`
        let _key = key.slice(1)

        if (["populate", "sort", "skip", "limit"].indexOf(_key) !== -1) {
            if (operation.op !== "count") {
                meta_filters[_key](value, operation)
            }
        }
        else {
            let filter = exports.query_mapping(key, value)
            query_filters = addOrExtend(filter, query_filters)
        }
    })

    // Default to 2000 in case that there is no limit explicitly specified in the request
    if (!operation.options.limit && operation.op !== "count") {
        operation.limit(DEFAULT_LIMIT)
    }

    Object.keys(filters).forEach((key) => {
        query_filters = addOrExtend({ [key]: filters[key] }, query_filters)
    })

    Object.keys(query_filters).forEach((key) => {
        // $and conditions
        let value = query_filters[key]
        if (Array.isArray(value) && value.length > 0) {
            operation.and(value)
        }
        // where conditions
        else {
            let value_key = Object.keys(value)[0]

            if (value_key === "$lte") { // less than equal
                operation.where(key).lte(value[value_key])
            }
            else if (value_key === "$gte") { // greater than equal
                operation.where(key).gte(value[value_key])
            }
            else { // others
                operation.where(key, value)
            }
        }
    })

    return operation
}

exports.update = function updateREST(request, response, next, obj, filters) {
    // Get the ID from the request parameters
    var id = request.params.id

    if (!id) {
        next(errors.MISSING_PARAMETERS(["params.id"]))
        return
    }

    filters = filters || {}
    filters._id = id

    // NOTE: Will not call any hooks, because Mongo's findAndModify is called directly

    obj
        .findOne(filters).exec()
        .then((model) => {
            if (model === null) {
                throw errors.RESOURCE_NOT_FOUND({ "id": id, "name": obj.modelName.toLowerCase() })
            }

            Object.keys(request.body).forEach((prop) => {
                model[prop] = request.body[prop]
            })

            return model.save()
        })
        .then((res) => response.json(res))
        .catch(next)
}

exports.search = function search(request, response, next, obj, filters, sort) {
    response.set("Content-Type", "application/json")

    var query = obj.find()

    try {
        query = exports.transformParameters(request.query, query, filters)
    }
    catch (err) {
        next(err)
        return
    }

    if (sort) {
        query.sort(sort)
    }

    let first = true

    let onData = (data) => {
        response.write(first ? "[" : ",")
        first = false

        response.write(JSON.stringify(data))
    }

    let onEnd = () => {
        response.end(first ? "[]" : "]")
    }

    query
        .cursor()
        .on("data", onData)
        .on("end", onEnd)
}

exports.create = function create(request, response, next, obj, defaults) {
    if (defaults) {
        Object.assign(request.body, defaults)
    }

    obj.create(request.body)
        .then((res) => {

            /**
             * Removes all fields, which are defined with `select = false`
             * in the schema definition of the given document which was resolved.
             *
             * This is necessary such that those fields are not communicated back.
             * in the response. Mongoose's `create()` ignores the `select` flag,
             * which makes this little hack a requirement.
             */
            let doc = res.toJSON()
            let schema_fields = res.constructor.schema.path

            Object.keys(schema_fields).forEach((field_name) => {

                let field = schema_fields[field_name]

                if (field.options.select === false) {
                    delete doc[field_name]
                }
            })

            response.json(doc)

            // Log creation
            console.log(`${obj.modelName} stored with id ${doc._id}`)
            return
        })
        .catch((err) => {
            next(err)
            return
        })
}

exports.get = function getREST(request, response, next, obj, filters) {

    // Get the ID from the request parameters
    var id = request.params.id

    if (!id) {
        next("request.params.id empty")
        return
    }

    var query = obj.findById(id)

    if (filters) {
        query.and(filters)
    }

    if ("_populate" in request.query) {
        // Populate
        query.populate(request.query._populate)
    }

    query.exec()
        .then((res) => {
            if (!res) {
                // next(errors.RESOURCE_NOT_FOUND({ "id": id, "name": obj.modelName.toLowerCase() }))
                return
            }

            response.json(res)
            return
        })
        .catch((err) => {
            next(err)
            return
        })
}
