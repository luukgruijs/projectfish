"use strict"

require("../index")
const fixtures = require("./user.fixtures")
const generators = require("../generators")

const { insufficient_permissions } = require("../validators")

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
                .expect(({ body }) => {
                    expect(body).to.be.a("array")
                    expect(body).to.have.lengthOf(2)
                })
            })
        })

        it("[success] user - get all users", () => {
            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "get",
                    "status_code": 200,
                    "url": '/v1/users'
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("array")
                    expect(body).to.have.lengthOf(2)
                })
            })
        })
    })

    describe("UPDATE user", () => {

        it("[success] admin - update single user", () => {

            const user = fixtures.users.user
            user.email = 'test1@test.nl'

            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 200,
                    "body": user,
                    "url": `/v1/users/${user._id}`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                    expect(body).to.have.property("_id")
                    expect(body).to.have.property("email").and.equal("test1@test.nl")
                })
            })
        })

        it("[fails] user - update single user", () => {

            const user = fixtures.users.admin
            user.email = 'test2@test.nl'

            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 403,
                    "body": user,
                    "url": `/v1/users/${user._id}`
                })
                .expect(({ body }) => insufficient_permissions(body))
            })
        })
    })
    
    describe("POST user", () => {

        const user = {
            email: "test3@test.nl",
            name: "luuk gruijs",
            role: "user",
        }

        it("[success] admin - create single user", () => {

            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 200,
                    "body": user,
                    "url": `/v1/users`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                })
            })
        })

        it("[fails] user - create single user", () => {

            const user = fixtures.users.admin
            user.email = 'test4@test.nl'

            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 403,
                    "body": user,
                    "url": `/v1/users`
                })
                .expect(({ body }) => insufficient_permissions(body))
            })
        })
    })
})
