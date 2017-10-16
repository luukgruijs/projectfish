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

exports.setUp = () => exports.reset()
    .then(() => models.user.create(generators.objToArr(users)))

exports.reset = generators.cleanDb
exports.users = users