/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const webpack           = require('webpack');
const merge             = require('webpack-merge');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig        = require('./base');
const reactToolboxVars  = require('./config/reactToolboxVars.json');
const packageJson       = require('../package.json');

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
              plugins: () => [
                require('postcss-cssnext')({
                  features: {
                    customProperties: {
                      variables: reactToolboxVars,
                    },
                  },
                }),
                require('precss')
              ]
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
    new webpack.optimize.OccurrenceOrderPlugin(),

    new ExtractTextPlugin({
      filename: 'styles.[name].css',
      allChunks: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        var context = module.context;
        return context && context.match(/node_modules/);
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    //*********************************** async chunks*************************

    //catch all - anything used in more than one place
    new webpack.optimize.CommonsChunkPlugin({
      async: 'common',
      minChunks(module, count) {
        return count >= 2;
      },
    }),

    //specifically bundle these large things
    // new webpack.optimize.CommonsChunkPlugin({
    //     async: 'react-dnd',
    //     minChunks(module, count) {
    //         var context = module.context;
    //         var targets = ['react-dnd', 'react-dnd-html5-backend', 'react-dnd-touch-backend', 'dnd-core']
    //         return context && context.indexOf('node_modules') >= 0 && targets.find(t => new RegExp('\\\\' + t + '\\\\', 'i').test(context));
    //     },
    // }),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify('development'),
      'process.env.VERSION'  : JSON.stringify(packageJson.version)
    })
  ],

  devServer: {
    host: '0.0.0.0',
    port: +port,
    historyApiFallback: true,
    contentBase: './'
  }
});
