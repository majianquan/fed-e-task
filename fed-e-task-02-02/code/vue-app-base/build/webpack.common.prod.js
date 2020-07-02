"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.common");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HardSourcePlugin = require("hard-source-webpack-plugin");
const config = require("../config");

const webpackConfig = merge(baseWebpackConfig(config), {
  mode: "production",
  entry: {
    app: path.join(__dirname,'../src/main.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(config, "js/[name].js?v=[chunkhash]"),
    chunkFilename: utils.assetsPath(config, "js/[name].js?v=[chunkhash]")
  },
  devtool: "cheap-source-map",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "vendors",
          priority: -10
        },
        "async-vendors": {
          name: "async-vendors",
          minChunks: 2,
          priority: -20,
          chunks: "async",
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: config.build.productionSourceMap,
        extractComments: true
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.join(__dirname, "../public/index.html"),
      inject: true,
      chunks: ["app", "vendors", "async-vendors", "manifest"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency"
    }),
    new CleanWebpackPlugin(),
    new HardSourcePlugin({
      cacheDirectory:
        process.cwd() + "/node_modules/.cache/hard-source/[confighash]",

      recordsPath:
        process.cwd() +
        "/node_modules/.cache/hard-source/[confighash]/records.json",

      configHash: function(webpackConfig) {
        return require("node-object-hash")({ sort: false }).hash(webpackConfig);
      }
    }),

    new MiniCssExtractPlugin({
      filename: utils.assetsPath(config, "css/[name].css?v=[contenthash]"),
      chunkFilename: utils.assetsPath(config, "css/[name].css?v=[contenthash]")
    }),

    new webpack.HashedModuleIdsPlugin(),

    // new CopyWebpackPlugin([
    //   {
    //     from: process.cwd() + "/assets",
    //     to: config.build.assetsRoot + "/assets",
    //     ignore: [".*"]
    //   }
    // ])
  ]
});
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
