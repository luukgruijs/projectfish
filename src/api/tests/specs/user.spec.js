"use strict"

require("../index")
const fixtures = require("./user.fixtures")

describe("User routes", () => {
    before(() => {
        return fixtures.setUp().then(() => Promise.all([
            testrunner.logonAs("admin", true),
            testrunner.logonAs("user", true),
        ]))
    })
    beforeEach(fixtures.setUp)
    after(fixtures.reset)

    describe("[success] GET users", () => {
        it("[success] get all users", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": '/v1/users'
                })
            })
        })
    })
})
