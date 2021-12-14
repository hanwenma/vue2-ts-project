// 本地服务地址
const devApiHost = 'http://10.98.213.38:8001';

// 测试环境 API地址
const testApiHost = 'https://test.xxx.com';

// 生产环境 API地址
const prodHost = 'https://xxx.com';

module.exports = {
  // 开发 环境
  dev: {
    // 部署应用包时的基本 URL。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    publicPath: '/mobile/',
    // 本地服务器
    host: '127.0.0.1',
    // 本地默认端口
    port: 3335,
    // 前端 服务
    feHost: '',
    apiHost: devApiHost,
    // 代理 配置
    proxy: {
      // 代理 捕获标志
      '/api': {
        target: devApiHost, // 代理目标地址
        changeOrigin: true, // target 是域名时，必须添加
        secure: false, // 支持https代理
        pathRewrite: {
          // 路径重写，用于生成实际url
          // '^/api': '/cost/api',
        },
      },
    },
  },
  // 测试 环境
  test: {
    // 部署应用包时的基本 URL。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    publicPath: '/mobile/',
    // 输出文件路径，默认为dist
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'assets',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
    indexPath: 'index.html',
    // 接口 BaseUrl
    apiHost: testApiHost,
  },
  // 生产 环境
  prod: {
    // 部署应用包时的基本 URL。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    publicPath: '/mobile/',
    // 输出文件路径，默认为dist
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'assets',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
    indexPath: 'index.html',
    // 接口 BaseUrl
    apiHost: prodHost,
  },
};
