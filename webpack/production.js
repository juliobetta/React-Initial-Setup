/**
 * Build config for electron 'Renderer Process' file
 */

const path                 = require('path');
const webpack              = require('webpack');
const merge                = require('webpack-merge');
const JavaScriptObfuscator = require('webpack-obfuscator');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');
const OfflinePlugin        = require('offline-plugin');
const WebpackChunkHash     = require('webpack-chunk-hash');
const baseConfig           = require('./base');
const packageJson          = require('../package.json');

const publicPath = '/';
const root = '..';

process.env.BABEL_ENV = 'production';

const config = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    publicPath,
    path: path.join(__dirname, `${root}/www`),
    filename: 'bundle.[name].[chunkhash].js',
    chunkFilename: 'bundle.[name].[chunkhash].js',
    pathinfo: false
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true, // default is false
                sourceMap: false,
                minimize: true,
                importLoaders: 1,
                localIdentName: "[name]--[local]--[hash:base64:8]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                minimize: true,
                quiet: true,
                plugins: require('./config/postcssPlugins')
              }
            }
          ]
        })
      },
      {
        test: require.resolve(`${root}/app/index.js`),
        loader: 'imports-loader',
        query: { 'offlineRuntime': 'offline-plugin/runtime' }
      }
    ]
  },

  plugins: [
    ...require('./config/chunks'),

    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),

    new OfflinePlugin({
      externals: ['/'],
      publicPath,
      relativePaths: false,
      ServiceWorker: {
        navigateFallbackURL: '/',
        events: true,
        excludes: ['*.hot-update.*']
      },
      AppCache: {
        publicPath: `${publicPath}/appcache`
      }
    }),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.ENV'       : JSON.stringify('web'),
      'process.env.NODE_ENV'  : JSON.stringify('production'),
      'process.env.BABEL_ENV' : JSON.stringify('production'),
      'process.env.VERSION'   : JSON.stringify(packageJson.version)
    }),

    // Minify without warning messages and IE8 support
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      comments: false,
      sourceMap: false,
      exclude: ['bundle.app.*.js', 'bundle.manifest.*.js']
    }),

    new JavaScriptObfuscator({
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: false,
      disableConsoleOutput: true,
      mangle: true,
      rotateStringArray: true,
      selfDefending: true,
      stringArray: true,
      stringArrayEncoding: false,
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false,
      sourceMap: false
    }, ['bundle.vendor.**.js', 'bundle.manifest.**.js'])
  ]
});

module.exports = config;
