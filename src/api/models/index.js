"user strict"

const mongoose = require("../mongoose")

var connected_models
var loadModels = (load) => {
    var all_models = [
        "item",
        "order",
        "lunch_order",
        "user",
        "settings"
    ]

    load = load || all_models
    mongoose.all_models = all_models

    if (!connected_models) {
        connected_models = load
            .map((model) => {
                return require(`./schemas/${model}`)(mongoose)
            })

        Object.keys(connected_models).forEach((name) => {
            const lower_name = name.toLowerCase()
            if (!connected_models[lower_name]) {
                connected_models[lower_name] = connected_models[name]
            }
        })
    }
    console.log(connected_models)
    return connected_models
}

module.exports = loadModels(null)
module.exports.modelSchemas = mongoose.modelSchemas