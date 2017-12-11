const path = require("path")
const merge = require('webpack-merge')
const webpack = require('webpack')

const webpack_common = require("./webpack.common")
const config = require("./config")

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(webpack_common, {
  entry: [
    path.join(__dirname, "..", "src", "main.js")
  ],
  devServer: {
    https: true,
    hot: true,
    contentBase: path.join(__dirname, "..", "..", "dist"),
    host: '0.0.0.0',
    proxy: {
      "/v1/**": {
        target: "http://localhost:8002/v1",
        pathRewrite: {
          "^/v1": ""
        }
      }
    }
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, "..", "views", "index.html"),
      inject: true
    }),
  ]
})
