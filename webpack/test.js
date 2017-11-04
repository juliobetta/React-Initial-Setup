/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const webpack           = require('webpack');
const merge             = require('webpack-merge');
const baseConfig        = require('./base');

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV  = 'test';
process.env.BABEL_DISABLE_CACHE = 1;

module.exports = merge(baseConfig, {
  output: { libraryTarget: 'commonjs2' },

  plugins: [
    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify('test')
    })
  ]
});
