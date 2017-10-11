"use strict"

const bcrypt = require('bcrypt-nodejs');

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
            "type": String,
            "select": false
        },
        "has_password": {
            "default": false,
            "type": Boolean,
            "desc": "Check if user has already set his password"
        },
        "role": {
            "default": "user",
            "desc": "A list of roles attached to the user",
            "enum": ["admin", "user"],
            "type": String
        },
        "orders": {
            "default": [],
            "desc": "All the orders a user has done",
            "type": [mongoose.Schema.Types.ObjectId]
        },
        "disabled": {
            "default": false,
            "required": true,
            "desc": "disabled state of user, we cannot delete the user. Else our orders will get corrupted",
            "type": Boolean,
        }
    })

    // schema the password before saving
    schema.pre('save', function(next){
        var user = this;

        // hash password only if candidate is new or password is changed
        if(!user.isModified('password')) {
            return next();
        };

        // generate hash
        bcrypt.hash(user.password, null, null, function(err, hash) {
            if (err) {
                return next(err);
            }

            // changed password to hash version
            user.password = hash;
            next();
        });
    });

    // method to compare a given password with the database hash
    schema.methods.comparePassword = function(password) {
        var user = this;
        return bcrypt.compareSync(password, this.password, (err, same) => {
            if (same) {
                return true
            } else {
                return false
            }
        })
    }

    return mongoose.model("User", schema)
}