const path = require("path")
const merge = require('webpack-merge')
const webpack = require('webpack')

const webpack_common = require("./webpack.common")
const config = require("./config")

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(webpack_common, {
  entry: [
    'webpack-hot-middleware/client?noInfo=true&reload=true',
    path.join(__dirname, "..", "src", "main.js")
  ],
  plugins: [

    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, "..", "views", "index.html"),
      inject: true
    }),

    new FriendlyErrorsPlugin()
  ]
})