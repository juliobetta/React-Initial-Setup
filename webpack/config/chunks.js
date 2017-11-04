const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = [
  new ExtractTextPlugin({
    filename: 'styles.[name].[chunkhash].css',
    allChunks: true
  }),

  //catch all - anything used in more than one place
  new webpack.optimize.CommonsChunkPlugin({
    async: 'common',
    minChunks(module, count) {
      return count >= 2;
    },
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module) {
      const context = module.context;
      return context && context.match(/node_modules/);
    },
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: 'babel-polyfill'
  })
];
