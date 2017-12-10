"user strict"

const mongoose = require("../mongoose")

function reducePath(receiver, path, instance) {
    if (path.length <= 1) {
        receiver[path[0]] = instance
        return receiver
    }

    var key = path.shift()
    var nested = receiver[key] || {}
    receiver[key] = nested
    reducePath(nested, path, instance)

    return receiver
}

var connected_models
var loadModels = (load) => {
    var all_models = [
        "Item",
        "Order",
        "LunchOrder",
        "User",
        "Settings"
    ]

    load = load || all_models
    mongoose.all_models = all_models

    if (!connected_models) {

        connected_models = load
            .map((model) => {
                return {
                    "instance": require(`./schemas/${model}`)(mongoose),
                    "path": model.split("/")
                }
            })
            .reduce((xs, model) => reducePath(xs, model.path, model.instance), {})

        Object.keys(connected_models).forEach((name) => {
            const lower_name = name.toLowerCase()
            if (!connected_models[lower_name]) {
                connected_models[lower_name] = connected_models[name]
            }
        })
    }

    return connected_models
}

module.exports = loadModels(null)
module.exports.modelSchemas = mongoose.modelSchemas