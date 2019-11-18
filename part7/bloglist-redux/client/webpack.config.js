const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

const config = {
  entry: ["@babel/polyfill", "./src/"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    proxy: [
      {
        path: "/api/",
        target: "http://localhost:3003",
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      manifest: "./public/manifest.json",
    }),
  ],
}

module.exports = config
