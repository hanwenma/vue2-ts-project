const envConf = require('./webpack.base.conf.js'); // eslint-disable-line
const envConfVal = envConf[process.env.VUE_APP_API_ENV];

// 运行时 环境配置
const envConfig = () => {
  const devConf = {
    publicPath: envConfVal.publicPath,
    lintOnSave: true, // 保存时 lint 代码
    // 配置服务器
    devServer: {
      host: envConfVal.host,
      port: envConfVal.port,
      hot: true,
      open: 'Google Chrome',
      // 代理设置
      proxy: envConfVal.proxy,
    },
  };
  return devConf;
};

module.exports = envConfig();
