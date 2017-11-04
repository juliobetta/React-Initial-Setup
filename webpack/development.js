/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const webpack     = require('webpack');
const merge       = require('webpack-merge');
const path        = require('path');
const baseConfig  = require('./base');
const packageJson = require('../package.json');

const port = process.env.PORT || 8080;
const root = '..';

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',

  output: {
    path: path.join(__dirname, `${root}/build`),
    filename: 'bundle.[name].js',
    pathinfo: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: require('./config/postcssPlugins')
            }
          }
        ]
      },
      {
        test: require.resolve(`${root}/app/index.js`),
        loader: 'imports-loader?whyDidYouUpdate=why-did-you-update'
      }
    ]
  },

  plugins: [
    ...require('./config/chunks'),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.ENV'        : JSON.stringify('web'),
      'process.env.NODE_ENV'   : JSON.stringify('development'),
      'process.env.SERVER_PORT': JSON.stringify('3000'),
      'process.env.SERVER_HOST': JSON.stringify('localhost'),
      'process.env.SERVER_URL' : JSON.stringify('http://localhost:3000'),
      'process.env.VERSION'    : JSON.stringify(packageJson.version)
    })
  ],

  devServer: {
    host: '0.0.0.0',
    port: +port,
    historyApiFallback: true,
    contentBase: './'
  }
});
