const models = require("../../models")
const config = require("../../config")
const generators = require("../generators")

const users = {
    admin: {
        _id: generators.objectId(),
        email: "testadmin@projectfish.nl",
        name: "luuk gruijs",
        role: "admin",
        password: Object.assign({}, {
            hash: "test",
        }),
    },
    user: {
        _id: generators.objectId(),
        email: "testuser@projectfish.nl",
        name: "luuk gruijs",
        role: "user",
        password: Object.assign({}, {
            hash: "test",
        }),
    }
}

const settings = {
    _id: generators.objectId(),
    budget: 10
}

exports.setUp = () => exports.reset()
    .then(() => Promise.all([
        models.User.create(generators.objToArr(users)),
        models.Settings.create(settings)
    ]))

exports.reset = generators.cleanDb
exports.users = users
exports.settings = settings