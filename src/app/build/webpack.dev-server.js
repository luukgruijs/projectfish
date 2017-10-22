var webpack = require('webpack');
var config = require("./config")
var dev_config = require('./webpack.dev');
var compiler = webpack(dev_config);
var express = require("express")
var path = require("path")

var app = express()

// enable history api fallback
app.use(require('connect-history-api-fallback')())

// setup webpack dev middleware
var devMiddleware = require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: dev_config.output.publicPath
})

// setup webpack hot middleware
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// hook dev middleware to express app
app.use(devMiddleware)

// hook hot middleware to express app
app.use(hotMiddleware)

// serve static files
app.use("/static", express.static(path.join(__dirname, "..", "dist")))

// wait untill middleware is set, then log
devMiddleware.waitUntilValid(function () {
  console.log(`> Listening at http://localhost:${config.dev.port}`)
})

module.exports = app.listen(config.dev.port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})