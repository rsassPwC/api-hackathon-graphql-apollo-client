const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const buildDir = "../out";
const srcDir = "../src";

module.exports = {
  entry: path.join(__dirname, srcDir, "index.ts"),
  target: "web",
  module: {
    rules: [{
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                "sourceMap": true,
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: (chunkData) => {
      return chunkData.chunk.name === "index" ? "[name].js" : "[name].[chunkhash].js";
    },
    chunkFilename: "[chunkhash].js",
    path: path.join(__dirname, buildDir)
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0
    }
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: path.join(__dirname, buildDir, "index.html"),
      template: path.join(__dirname, srcDir, "webpack-index.html")
    }),
    new CopyPlugin([
      '.env*',
      'node_modules/@webcomponents/webcomponentsjs/**',
      'manifest.json',
      { from: "node_modules/@appkit-web-components/base/lib/appkit-base.min.css", to: path.join(__dirname, buildDir) },
      { from: "node_modules/@appkit-web-components/base/lib/**/*", to: path.join(__dirname, buildDir) },
      { from: "node_modules/@appkit-web-components/fonts/lib/**/*", to: path.join(__dirname, buildDir) },
      { from: "node_modules/@appkit-web-components/icon/lib/appkit-icon.min.css", to: path.join(__dirname, buildDir) },
      { from: "node_modules/@appkit-web-components/fonts/lib/appkit-font-faces.min.css", to: path.join(__dirname, buildDir) },
      { from: "node_modules/@appkit-web-components/fonts/lib/appkit-icon-font-faces.min.css", to: path.join(__dirname, buildDir) },
      { from: "node_modules/@appkit-web-components/fonts/lib/font-icon/**/*", to: path.join(__dirname, buildDir) },
      { from: "node_modules/@appkit-web-components/fonts/lib/fonts/**/*", to: path.join(__dirname, buildDir) },
      { from: "assets/**/*", to: path.join(__dirname, buildDir) },
    ]),
  ]
};