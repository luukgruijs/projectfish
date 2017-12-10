"use strict"

require("../index")
const fixtures = require("./lunchorder.fixtures")
const generators = require("../generators")

const { insufficient_permissions } = require("../validators")

describe("Lunch order routes", () => {
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
        it("[success] admin - get all lunchorders", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": '/v1/lunchorders'
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("array")
                    expect(body).to.have.lengthOf(1)
                })
            })
        })

        it("[fails] user - get all lunchorders", () => {
            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 403,
                    "url": '/v1/lunchorders'
                }).expect(({ body }) => insufficient_permissions(body))
            })
        })
    })

    describe("GET specific order", () => {

        it("[success] admin - get lunch order", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": `/v1/lunchorders/${fixtures.lunchorders._id}`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                    expect(body).to.have.property("_id")
                    expect(body.orders).to.be.lengthOf(2)
                })
            })
        })

        it("[success] admin - get lunch order", () => {
            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 403,
                    "url": `/v1/lunchorders/${fixtures.lunchorders._id}`
                }).expect(({ body }) => insufficient_permissions(body))
            })
        })
    })


})
