const path = require('path'); // eslint-disable-line
const fs = require('fs'); // eslint-disable-line
const pkg = require('../package.json'); // eslint-disable-line

// 路径
const pathResolve = (dir) => {
  return path.join(__dirname, dir);
};

// 自动设置版本信息
const versionSet = () => {
  const vs = pkg.version.split('.');
  vs[2]++;
  if (vs[2] > 15) {
    vs[1]++;
    vs[2] = 0;
  }
  if (vs[1] > 15) {
    vs[0]++;
    vs[1] = 0;
    vs[2] = 0;
  }
  pkg.version = vs.join('.');
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2), {
    encoding: 'utf8',
  });
};

module.exports = {
  pathResolve, // 路径
  versionSet, // 自动设置版本信息
};
