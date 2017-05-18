"use strict"

module.exports = function User(mongoose) {
    var schema = new mongoose.Schema({
        "email": {
            "desc": "The users email address",
            "format": "email",
            "required": true,
            "type": String,
            "unique": true
        },
        "name": {
            "desc": "The name of the user",
            "required": true,
            "trim": true,
            "type": String
        },
        "password": {
            "default": "",
            "select": false,
            "type": String
        },
        "role": {
            "default": "user",
            "desc": "A list of roles attached to the user",
            "enum": ['admin', 'user'],
            "type": String
        },
        "orders": {
            "default": [],
            "desc": "All the orders a user has done",
            "type": [mongoose.Schema.Types.ObjectId]
        }
    })

    // TODO validate available roles

    return mongoose.model("User", schema)
}