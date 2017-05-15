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
                "item_id": {
                    "type": mongoose.Schema.Types.ObjectId,
                    "ref": "Item",
                    "desc": "ID of item",
                    "required": true,
                },
                "quantity":{
                    "type": Number,
                    "default": 1,
                    "required": true
                }
            }]
        },
        "user_id": {
            "desc": "The ID of the user that orders the items",
            "type": mongoose.Schema.Types.ObjectId
        }
    })

    // TODO
    // add validation so that items can only contain unique items

    return mongoose.model("Basket", schema)
}