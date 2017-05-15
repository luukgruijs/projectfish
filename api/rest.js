"use strict"

const model = require("./models")

exports.search = function search(request, response, next, obj) {
    response.set("Content-Type", "application/json")

    var query = obj.find()
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

    console.log(request.body)

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