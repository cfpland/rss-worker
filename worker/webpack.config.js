const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  optimization: {
    minimize: false
  },
  node: {
    fs: 'empty'
  },
  performance: {
    hints: false
  },
  plugins: [
    new Dotenv(),
  ],
  output: {
    path: __dirname + "/dist",
    publicPath: "dist",
    filename: "index.js"
  }
};
