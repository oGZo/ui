var url = require('url');
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var conf = require('../config/conf');
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const dev = config.dev;
const { port, env } = dev;
const urlObject = url.parse(conf.dev.api, true, true);
const https = urlObject.protocol === 'https';
urlObject.protocol = urlObject.protocol || ({ true: 'https:', false: 'http:' })[https];
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

env.url = '/kkl/';

module.exports = merge(baseWebpackConfig, {
//   module: {
//     rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
//   },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
      'CONFIG': JSON.stringify(env)
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['stat', 'app'],
    }),
    new HtmlWebpackPlugin({
        filename: 'nonsupport.html',
        template: 'index.html',
        inject: 'head',
        chunks: [],
    }),
    new FriendlyErrorsPlugin()
  ]
})
