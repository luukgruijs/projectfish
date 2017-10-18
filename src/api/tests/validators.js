"use strict"

function validate(code, { body }) {
    expect(body)
        .to.be.an("object")
        .to.have.keys(["code", "message", "details", "timestamp"])

    expect(body.code)
        .to.equal(code)
}

exports.insufficient_permissions = (body) => {
    validate(106, { body })
    expect(body).to.have.property("code").and.equal(106)
}