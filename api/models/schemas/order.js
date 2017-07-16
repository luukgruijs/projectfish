"user strict"

module.exports = function Order(mongoose) {
    var schema = new mongoose.Schema({
        "amount": {
            "desc": "The total basket price",
            "required": true,
            "type": Number
        },
        "created_at": {
            "default": new Date(),
            "desc": "The date at which the basket is created",
            "type": Date
        },
        "items": {
            "required": true,
            "desc": "The items in an order",
            "type": [{
                "item": {
                    "name": {
                        "desc": "The name of the item",
                        "required": true,
                        "trim": true,
                        "type": String
                    },
                    "category": {
                        "desc": "The category of the item",
                        "type": String
                    },
                    "price": {
                        "desc": "The price of the item",
                        "required": true,
                        "type": Number,
                    }
                },
                "quantity":{
                    "type": Number,
                    "default": 1,
                    "required": true
                }
            }]
        },
        "user": {
            "desc": "The ID of the user that orders the items",
            "type": mongoose.Schema.Types.ObjectId
        }
    })

    return mongoose.model("Order", schema)
}