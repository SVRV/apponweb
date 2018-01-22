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
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        include: [/node_modules\/jquery/], [/node_modules\/ol/],
      }
    ]
  },
  devtool: "eval"
}
