const envConf = require('./webpack.base.conf.js'); // eslint-disable-line
const envConfVal = envConf[process.env.VUE_APP_API_ENV];
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 生产 环境配置
const envConfig = () => {
  const buildConf = {
    //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    // parallel: require('os').cpus().length > 1,
    publicPath: envConfVal.publicPath,
    indexPath: envConfVal.indexPath,
    assetsDir: envConfVal.assetsDir,
    outputDir: envConfVal.outputDir,
  };
  return buildConf;
};

module.exports = envConfig();
