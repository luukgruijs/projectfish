const models = require("../../models")
const config = require("../../config")
const generators = require("../generators")

 const users = {
    "admin": {
        "_id": generators.objectId(),
        "email": "testadmin@projectfish.nl",
        "name": "luuk gruijs",
        "role": "admin",
        "password": "test",
    },
    "user": {
        "_id": generators.objectId(),
        "email": "testuser@projectfish.nl",
        "name": "luuk gruijs",
        "role": "user",
        "password": "test",
    }
}

const items = {
   zalm: {
        _id: generators.objectId(),
        name: "zalm",
        price: 1000
    },
    kibbeling: {
        _id: generators.objectId(),
        name: "kibbeling",
        price: 1000
    },
    paling: {
        _id: generators.objectId(),
        name: "paling",
        price: 1000
    },
}

exports.setUp = () => exports.reset()
    .then(() => Promise.all([
        models.User.create(generators.objToArr(users)),
        models.Item.create(generators.objToArr(items))
    ]))

exports.reset = generators.cleanDb
exports.users = users
exports.items = items