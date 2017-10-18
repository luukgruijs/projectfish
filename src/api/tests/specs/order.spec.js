"use strict"

require("../index")
const fixtures = require("./order.fixtures")
const generators = require("../generators")

describe("Order routes", () => {
    before(() => {
        return fixtures.setUp()
        .then(() => Promise.all([
            testrunner.logonAs("admin", true),
            testrunner.logonAs("user", true),
        ]))
    })
    beforeEach(fixtures.setUp)
    after(fixtures.reset)

    describe("GET orders", () => {
        it("[success] admin - get all orders", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": '/v1/orders'
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("array")
                    expect(body).to.be.lengthOf(2)
                })
            })
        })

        it("[success] user - get all orders", () => {
            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": '/v1/orders'
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("array")
                    expect(body).to.be.lengthOf(2)
                })
            })
        })
    })

    describe("POST order", () => {
        const order = {
            user: fixtures.users.admin._id,
            amount: 1000,
            items: [
                {
                    name: "kibbeling",
                    price: 1000
                }
            ],
        }

        it("[success] create an order", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 200,
                    "body": order,
                    "url": `/v1/order`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                    expect(body).to.have.property("_id")
                    expect(body.items).to.be.lengthOf(1)
                })
            })
        })
    })


})
