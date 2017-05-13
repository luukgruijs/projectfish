"user strict"

module.exports = function Item(mongoose) {
    var schema = mongoose.Schema({
        "name": {
            "desc": "The name of the item",
            "required": true,
            "trim": true,
            "type": String
        },
        "category": {
            "default": [],
            "desc": "The category of the item",
            "type": [String]
        },
        "price": {
            "desc": "The price of the item",
            "required": true,
            "type": Number,
        }
    })

    return mongoose.model("Item", schema)
}