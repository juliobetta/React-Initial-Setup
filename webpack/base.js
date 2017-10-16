/**
 * Base webpack config used across other specific configs
 */

const path                 = require('path');
const ProgressBarPlugin    = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const root = '..';
const hasBundleAnalyzer = process.argv.some(arg => arg.indexOf('webpack-dev-server') >= 0);

module.exports = {
  context: path.resolve(__dirname, `${root}/app/src`),

  entry: {
    app: '../index.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
          'webpack-module-hot-accept'
        ],
        exclude: /node_modules/
      },
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/media/[name].[ext]'
        }
      }
    ]
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      path.resolve(__dirname, `${root}/app`),
      path.resolve(__dirname, `${root}/app/src`),
      path.resolve(__dirname, `${root}/node_modules`)
    ]
  },

  plugins: [
    new ProgressBarPlugin(),

    !!hasBundleAnalyzer && new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle.html'
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '../index.html',
      chunksSortMode: function (chunk1, chunk2) {
        var orders = ['manifest', 'vendor', 'common', 'app'];
        var order1 = orders.indexOf(chunk1.names[0]);
        var order2 = orders.indexOf(chunk2.names[0]);

        return order1 - order2;
      }
    })
  ].filter(p => !!p)
};
