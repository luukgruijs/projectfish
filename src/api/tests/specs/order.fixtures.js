const models = require("../../models")
const config = require("../../config")
const generators = require("../generators")

const users = {
    admin: {
        _id: generators.objectId(),
        email: "testadmin@projectfish.nl",
        name: "luuk gruijs",
        role: "admin",
        password: "test",
    },
    user: {
        _id: generators.objectId(),
        email: "testuser@projectfish.nl",
        name: "luuk gruijs",
        role: "user",
        password: "test",
    },
    user_disabled: {
        _id: generators.objectId(),
        email: "testuserdisabled@projectfish.nl",
        name: "luuk gruijs",
        role: "user",
        password: "test",
        disabled: true,
    },
}

const orders = {
    fish: {
        _id: generators.objectId(),
        amount: 1000,
        items: [
            {
                name: "fish",
                price: 1000
            }
        ],
    },
    meat: {
        _id: generators.objectId(),
        amount: 1000,
        items: [
            {
                name: "meat",
                price: 1000
            }
        ],
    },
}

exports.setUp = () => exports.reset()
    .then(() => Promise.all([
        models.User.create(generators.objToArr(users)),
        models.Order.create(generators.objToArr(orders))
    ]))

exports.reset = generators.cleanDb
exports.users = users
exports.orders = orders