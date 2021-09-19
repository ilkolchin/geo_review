const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode: mode,

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "img/[hash][ext][query]"
  },

  module: {
    rules: [
      {
        test: /\.hbs/,
        use: "handlebars-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset"
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.hbs"
    })],

  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
};