const path = require("path");
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  target: "node",
  entry: "./index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "deploy"),
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(jpg|png)$/i,
        type: "asset/resource",
      },
    ],
  },
};
