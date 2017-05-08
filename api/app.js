const express       = require("express")
const morgan        = require("morgan")
const mongoose      = require("mongoose")
const bodyParser    = require("body-parser")
const config        = require("./config")
const fixtures      = require("./fixtures")
const app           = express()

// configure bodyparser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// log all requests to the console
app.use(morgan("dev"))

// connect to the database
mongoose.connect(config.database, function() {
    console.log("succesfully connected to mongo")
})

// testdata
// fixtures.generate()

// mount routes
const routes = require("./routes")(app, express)

// mount api under /api
app.use("/v1", routes)

// start up app
if (config.environment === "dev") {
    app.listen(config.port)
    console.log(`Magic happens on port ${config.port}`)
}
