const nodemailer = require("nodemailer")
const config = require("../config")

const transport_config = {}

if (config.smtp_host) {
    transport_config.host = config.smtp_host
} else {
    throw "Configuration parameter 'smtp_host' was not specified."
}

if (config.smtp_port) {
    transport_config.port = config.smtp_port
}

var transport = nodemailer.createTransport(transport_config)

module.exports = (message) => {
    return new Promise((resolve, reject) => {
        return transport.sendMail(message, (err, res) => {
            return err ? reject(err) : resolve(res)
        })
    })
}