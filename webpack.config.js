const path = require('path');
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: false,
  entry: "./src/main.js",
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new GasPlugin()
  ]
}
