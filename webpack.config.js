const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const federationConfig = require("./federation.config.json");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const pkg = require("./package.json");
const tsconfig = require("./tsconfig.json");

const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const mode = process.env.MODE || "none";
const isProduction = mode === "production";

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";

module.exports = {
  entry: "./src/index.tsx",
  mode: process.env.MODE,
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            passes: 2,
            drop_console: false,
            drop_debugger: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    // @NOTE: fix HMR, see - https://stackoverflow.com/a/66197410
    runtimeChunk: isProduction ? undefined : "single",
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "esbuild-loader",
        options: {
          target: "es2015",
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "auto",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: PUBLIC_PATH,
    }),
    new ModuleFederationPlugin({
      ...federationConfig,
      filename: "remoteEntry.js",
      shared: [
        {
          react: {
            singleton: true,
            requiredVersion: pkg.dependencies.react,
          },
        },
        {
          "react-dom": {
            singleton: true,
            requiredVersion: pkg.dependencies["react-dom"],
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
  ],
};
