const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

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
    new webpack.DefinePlugin({
      LAST_MODIFIED: JSON.stringify(new Date().toJSON()),
    }),
  ],
  output: {
    path: __dirname + "/dist",
    publicPath: "dist",
    filename: "index.js"
  }
};
