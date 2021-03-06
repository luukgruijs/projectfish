"user strict"

module.exports = function Item(mongoose) {
    var schema = mongoose.Schema({
        "budget": {
            "desc": "The budget per order",
            "required": true,
            "trim": true,
            "type": Number,
            "default": 0,
        },
    })

    return mongoose.model("Settings", schema)
}