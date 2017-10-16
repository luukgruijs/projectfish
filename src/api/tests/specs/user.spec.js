"use strict"

require("../index")
const fixtures = require("./user.fixtures")
const generators = require("../generators")

describe("User routes", () => {
    before(() => {
        return fixtures.setUp()
        .then(() => Promise.all([
            testrunner.logonAs("admin", true),
            testrunner.logonAs("user", true),
        ]))
    })
    beforeEach(fixtures.setUp)
    after(fixtures.reset)

    describe("GET users", () => {
        it("[success] admin - get all users", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": '/v1/users'
                })
            })
        })

        it("[success] user - get all users", () => {
            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 400,
                    "url": '/v1/users'
                })
            })
        })
    })
})
