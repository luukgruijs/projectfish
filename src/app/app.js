"use strict"

const http = require("http")
const config = require("../api/config")
const app = require("../api/app")

const server = http.createServer(app)
server.listen(config.port, (err) => {
    if (err) {
        console.error(err)
        return
    }

    console.log(`Fish listening on port ${config.port}`)
})