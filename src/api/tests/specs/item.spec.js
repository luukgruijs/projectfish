"use strict"

require("../index")
const fixtures = require("./item.fixtures")
const generators = require("../generators")

describe.only("Item routes", () => {
    before(() => {
        return fixtures.setUp()
        .then(() => Promise.all([
            testrunner.logonAs("admin", true),
            testrunner.logonAs("user", true),
        ]))
    })
    beforeEach(fixtures.setUp)
    after(fixtures.reset)

    describe("GET items", () => {
        it("[success] get all items", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": '/v1/items'
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("array")
                    expect(body).to.have.lengthOf(3)
                })
            })
        })
    })

    describe("POST item", () => {

        const item = {
            name: "zalm",
            price: 1000
        }

        it("[success] create new item", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 200,
                    "body": item,
                    "url": `/v1/items`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                    expect(body).to.have.property("_id")
                    expect(body).to.have.property("name").and.equal("zalm")
                })
            })
        })
    })

    describe("UPDATE item", () => {

        const item = fixtures.items.kibbeling
        item.name = "witvis"

        it("[success] update existing item", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 200,
                    "body": item,
                    "url": `/v1/items/${item._id}`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                    expect(body).to.have.property("_id")
                    expect(body).to.have.property("name").and.equal("witvis")
                })
            })
        })
    })

    describe("DELETE item", () => {

        const item = fixtures.items.kibbeling

        it("[success] delete existing item", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "delete",
                    "status_code": 200,
                    "url": `/v1/items/${item._id}`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                    expect(body).to.have.property("_id")
                    expect(body).to.have.property("deleted").and.equal(true)
                })
            })
        })
    })


})
