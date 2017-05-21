const express       = require("express")
const morgan        = require("morgan")
const mongoose      = require("mongoose")
mongoose.Promise    = require("bluebird")
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
fixtures.startup()

// mount routes
const routes = require("./routes")(app, express)

// allow origin
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token');
    next();
});

// Set custom 404 page.
app.use((req, res, next) => {
    if (req.method === "OPTIONS") { // Handle pre-flight CORS requests
        res.sendStatus(200)
        return
    }

    next()
    return
})

// mount api under /api
app.use("/v1", routes)

// start up app
if (config.environment === "dev") {
    app.listen(config.port)
    console.log(`Magic happens on port ${config.port}`)
}
