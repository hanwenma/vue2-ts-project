module.exports = {
  root: true, // 当前配置为根配置，将不再从上级文件夹查找配置
  env: {
    node: true, // 设置为所需检查的代码是在node环境运行的
    // browser: true, // 设置为所需检查的代码是在浏览器环境运行的
    // es6: true // 设置所需检查代码为 es6 语法书写
  },
  extends: ['plugin:vue/essential', 'plugin:vue/strongly-recommended', '@vue/prettier', '@vue/typescript'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    // sourceType: 'module', // 指定来源的类型，有两种script或module
  },
  rules: {
    'no-// console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
