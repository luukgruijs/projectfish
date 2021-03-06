"use strict"

require("../index")
const path = require("path")
const fixtures = require("./csv.fixtures")
const generators = require("../generators")
const { insufficient_permissions } = require("../validators")

describe("CSV routes", () => {
    before(() => {
        return fixtures.setUp()
        .then(() => Promise.all([
            testrunner.logonAs("admin", true),
            testrunner.logonAs("user", true),
        ]))
    })
    beforeEach(fixtures.setUp)
    after(fixtures.reset)

    describe("POST item CSV", () => {
        it("[success] admin - upload items csv", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 200,
                    "file": path.join(__dirname, "..", "csv", "items.csv"),
                    "url": `/v1/csv/items`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                })
            })
        })

        it("[fails] user - upload items csv", () => {
            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 403,
                    "file": path.join(__dirname, "..", "csv", "items.csv"),
                    "url": `/v1/csv/items`
                }).expect(({ body }) => insufficient_permissions(body))
            })
        })

        it("[fails] wrong item headers", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 400,
                    "file": path.join(__dirname, "..", "csv", "users.csv"),
                    "url": `/v1/csv/items`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                    expect(body).to.have.property("code").and.equal(108)
                })
            })
        })
    })

    describe("POST user CSV", () => {
        it("[success] admin - upload users csv", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 200,
                    "file": path.join(__dirname, "..", "csv", "users.csv"),
                    "url": `/v1/csv/users`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                })
            })
        })

        it("[fails] user - upload users csv", () => {
            return testrunner.logonAs("user").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 403,
                    "file": path.join(__dirname, "..", "csv", "users.csv"),
                    "url": `/v1/csv/users`
                }).expect(({ body }) => insufficient_permissions(body))
            })
        })

        it("[fails] wrong users headers", () => {
            return testrunner.logonAs("admin").then((agent) => {
                return agent.request({
                    "method": "post",
                    "status_code": 400,
                    "file": path.join(__dirname, "..", "csv", "items.csv"),
                    "url": `/v1/csv/users`
                })
                .expect(({ body }) => {
                    expect(body).to.be.a("object")
                    expect(body).to.have.property("code").and.equal(109)
                })
            })
        })
    })
})
