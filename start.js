"use strict"

const http = require("http")
const config = require("./lib/config")
const server = require("./lib")

server.listen(config.port, (err) => {
    if (err) {
        console.error(err)
        return
    }

    console.log(`Fish listening on port ${config.port}`)
})