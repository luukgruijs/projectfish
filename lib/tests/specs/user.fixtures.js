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

exports.setUp = () => exports.reset()
    .then(() => models.User.create(generators.objToArr(users)))

exports.reset = generators.cleanDb
exports.users = users