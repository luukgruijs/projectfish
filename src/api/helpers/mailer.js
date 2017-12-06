const nodemailer = require("nodemailer")
const config = require("../config")

const transport_config = {
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: config.email_user,
        pass: config.email_password
    }
}

const transport = nodemailer.createTransport(transport_config);

module.exports = (message) => {
    return new Promise((resolve, reject) => {
        return transport.sendMail(message, (err, res) => {
            return err ? reject(err) : resolve(res)
        })
    })
}