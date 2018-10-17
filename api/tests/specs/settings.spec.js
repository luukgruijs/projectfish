"use strict"

require("../index")
const fixtures = require("./settings.fixtures")
const generators = require("../generators")

const { insufficient_permissions } = require("../validators")

describe("Settings routes", () => {
    before(() => {
        return fixtures.setUp()
        .then(() => Promise.all([
            testrunner.logonAs("admin", true),
            testrunner.logonAs("user", true),
        ]))
    })
    beforeEach(fixtures.setUp)
    after(fixtures.reset)

    describe("GET settings", () => {
        it("[success] admin - get all settings", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": '/v1/settings'
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("array")
                    expect(body).to.be.lengthOf(1)
                })
            })
        })

        it("[success] user - get all settings", () => {
            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": '/v1/settings'
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("array")
                    expect(body).to.be.lengthOf(1)
                })
            })
        })
    })

    describe("UPDATE settings", () => {

        const settings = fixtures.settings
        settings.budget = 12

        it("[success] admin - update single setting", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 200,
                    "body": settings,
                    "url": `/v1/settings/${settings._id}`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                    expect(body).to.have.property("_id")
                    expect(body).to.have.property("budget").and.equal(12)
                })
            })
        })

        it("[fails] user - update single setting", () => {
            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 403,
                    "body": settings,
                    "url": `/v1/settings/${settings._id}`
                })
                .expect(({ body }) => insufficient_permissions(body))
            })
        })
    })


})
