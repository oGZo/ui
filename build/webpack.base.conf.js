var path = require("path");
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var utils = require("./utils");
var config = require("../config");
var env = process.argv[2] || 'dev'; // 打包设置的参数
var ENV_CONFIG = require("../config/conf")[env];
ENV_CONFIG.env = env;

var vueLoaderConfig = require("./vue-loader.conf");
var basePath = 'src/pages/';
var pages = utils.getPages(basePath);
function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

console.log(ENV_CONFIG);

module.exports = {
    entry: {
        app: "./src/main.js",
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        publicPath:
        process.env.NODE_ENV === "production"
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json", ".less", ".css"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src")
        }
    },
    module: {
        rules: [
            // eslint配置顺序默认第一个 其他地方对这个顺序有依赖 切记不可修改
            {
                test: /\.(js|vue)$/,
                loader: "eslint-loader",
                enforce: "pre",
                include: [resolve("src"), resolve("test")],
                options: {
                    formatter: require("eslint-friendly-formatter")
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [resolve("src"), resolve("test")],
            },
            // {
            //     test: /\.js$/,
            //     enforce: 'post', // post-loader处理
            //     loader: 'es3ify-loader',
            //     include: [resolve("src"), resolve("test")]
            // },
            {
                test: /\.(less|css)$/,
                use: [
                    "style-loader",
                    "css-loader?minimize",
                    'postcss-loader',
                    "less-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                limit: 10000,
                name: utils.assetsPath("img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                limit: 10000,
                name: utils.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PAGE_LIST: JSON.stringify(pages),
            ENV_CONFIG: JSON.stringify(ENV_CONFIG)
        }),
    ]
};
