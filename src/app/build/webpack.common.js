var path = require('path')
const utils = require("./webpack.utils")
const config = require("./config")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: '[name].js',
    publicPath: config.dev.publicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'utils': resolve('src/utils'),
      vue: "vue/dist/vue.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders()
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        }
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        }
      }
    ]
  }
}