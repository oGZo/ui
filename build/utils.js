const fs = require('fs');
var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}


// 获取当前项目的所有页面
exports.getPages = basePath =>  {
    const dirs = getSubDirs(basePath);
    const pages = dirs.map(name => {
        return {
            name,
            children: []
        };
    });
    // 获取页面的子文件夹children的list信息
    pages.forEach(page => {
        var childDirPath = path.resolve(basePath, `${page.name}/children`);
        // console.log(childDirPath);
        if(fs.existsSync(childDirPath)){
            getSubDirs(childDirPath).forEach(name => {
                var dirSub = {
                    name,
                    children: []
                };
                page.children.push(dirSub);
            });
        }
    });
    return pages;
};

// 获取当前路径下的子文件夹列表
const getSubDirs = basePath => fs.readdirSync(basePath).filter(file => fs.statSync(path.resolve(basePath, file)).isDirectory());
exports.getSubDirs = getSubDirs;
