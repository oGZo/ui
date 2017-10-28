// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var url = require('url');
const devEnv = require('./dev.env')
const conf = require('./conf')
const urlObject = url.parse(conf.dev.api, true, true)
const port = 4000;
// console.log(urlObject);
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../service/public/index.html'),
        assetsRoot: path.resolve(__dirname, '../service/public'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: devEnv,
        port,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // FIXME    由于localhost3000 => localhost:3004 一直代理不成功  故开发页面直接调对应接口
        proxyTable: {
            '/kkl': {
                target: `${urlObject.protocol}//${urlObject.host}${urlObject.path}`,
                // changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '^/kkl/': ''
                },
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}