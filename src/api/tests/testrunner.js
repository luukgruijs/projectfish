const app = require("../../api/app")
const config = require("../config")
const supertest = require("supertest")

const credentials = {
    "admin": { "email": "testadmin@projectfish.nl", "password": "test" },
    "user": { "email": "testuser@projectfish.nl", "password": "test" },
}

const cache = {}

const enhanceAgent = (agent, token) => {
    agent.request = function exec(opts) {
        const test = agent[opts.method](opts.url)

        if (opts.headers) {
            // if opts.headers is defined, use just that for setting all headers
            Object.keys(opts.headers).forEach((name) => {
                test.set(name, opts.headers[name])
            })
        }
        else {
            // set content headers the old way
            test
                .set("Accept", opts.request_accept || "application/json")
                .set("Content-Type", opts.request_content_type || "application/json")

            test
                .set("x-access-token", token)

            // set request data
            if (opts.query) {
                test.query(opts.query)
            }
            if (opts.body) {
                test.send(opts.body)
            }

            if (opts.file) {
                test.attach("file", opts.file)
            }

            if (opts.status_code) {
                test.expect(opts.status_code)
            }

            return test
        }
    }

    return agent
}

exports.request = (opts) => {

    const app_to_use = opts.app || app
    const test = supertest(app_to_use)[opts.method](opts.url)

    // set content headers
    test
        .set("Accept", opts.request_accept || "application/json")
        .set("Content-Type", opts.request_content_type || "application/json")

    if (opts.headers) {
        // if opts.headers is defined, use just that for setting all headers
        Object.keys(opts.headers).forEach((name) => {
            test.set(name, opts.headers[name])
        })
    }
    else {
        // set content headers the old way
        test
            .set("Accept", opts.request_accept || "application/json")
            .set("Content-Type", opts.request_content_type || "application/json")
    }

    // set request data
    if (opts.query) {
        test.query(opts.query)
    }
    if (opts.body) {
        test.send(opts.body)
    }

    // expected response code
    if (opts.status_code) {
        test.expect(opts.status_code)
    }

    return test
}

exports.logonAs = (userRole, forceReauth) => {
    let server = app.listen()
    const agent = supertest.agent(server)
    config.supertesturl = `http://127.0.0.1:${agent.app.address().port}/v1`

    const cached_session = cache[userRole]
    if (!forceReauth && cached_session) {
        return Promise.resolve(enhanceAgent(agent, cached_session.token))
    }
    // logon with credentials form userRole
    return agent
        .post("/v1/authenticate")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(credentials[userRole])
        .expect(200)
        .then((res) => {
            // extract csrf_token from header
            const token = res.body.token
            if (!token) {
                throw new Error("no token found in POST /v1/authenticate response")
            }

            // update the cache
            cache[userRole] = { token }

            return enhanceAgent(agent, token)
        })
}