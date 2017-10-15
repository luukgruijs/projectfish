const models = require("../../models")
const config = require("../../config")
const generators = require("../generators")

const users = {
    "admin": {
        "_id": generators.objectId(),
        "email": "testadmin@projectfish.nl",
        "name": "luuk gruijs",
        "role": "admin"
    },
    "user": {
        "_id": generators.objectId(),
        "email": "testuser@projectfish.nl",
        "name": "luuk gruijs",
        "role": "user"
    }
}

const objToArr = (obj) => Object.keys(obj).map((key) => obj[key])

exports.setUp = () => exports.reset()
    .then(() => [
        models.user.create(objToArr(users))
    ])

exports.reset = generators.cleanDb
exports.users = users