/* 合法uri */
export const validateURL = (textval: string) => {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
};

/* 小写字母 */
export const validateLowerCase = (str: string) => {
  const reg = /^[a-z]+$/;
  return reg.test(str);
};

/* 大写字母 */
export const validateUpperCase = (str: string) => {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
};

/* 大小写字母 */
export const validatAlphabets = (str: string) => {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
};

// 金额千分位
export const moneyFor = (val = 0, fixed = 2) => {
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  var str = Number(val).toFixed(fixed) + '';
  var intSum = str
    .substring(0, str.indexOf('.'))
    .replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
  var dot = str.substring(str.length, str.indexOf('.')); //取到小数部分搜索
  var ret = intSum + dot;
  return ret;
};
