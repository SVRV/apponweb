const webpack = require('webpack');

module.exports = {
  entry: "./main.js",
  output: {
    filename: "bundle.js"
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: "eval"
}
