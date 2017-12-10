const express       = require("express")
const morgan        = require("morgan")
const bodyParser    = require("body-parser")
const config        = require("./config")
const fixtures      = require("./fixtures")
const http          = require("http")
const fs            = require("fs")
const path          = require("path")
const errors        = require("./errors")

const app = express()
const server = http.createServer(app);

// set default engine
app.use("/", express.static(path.join(__dirname, "..", "app", "views")))

// configure bodyparser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// log all requests to the console
app.use(morgan("dev"))

fixtures.startup()

// mount routes
const routes = require("./routes")(app)

// allow origin
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token, Cache-Control');
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

// serve index file
app.get("/", (req, res) => {
    res.render(fs.readFileSync(path.join(__dirname, "..", "app", "index.html")).toString())
})

// mount api under /v1
app.use("/v1", routes)

// set custom error handler
app.use(errors.handler)

// expose server
module.exports = server