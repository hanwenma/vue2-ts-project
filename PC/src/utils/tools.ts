import * as Cookies from 'js-cookie';

/**
 * 获取url中的参数
 */
export const getQueryString = (name: string) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

/**
 * 清空登录缓存
 */
export const clearCache = () => {
  Cookies.set('token', '');
  Cookies.set('userName', '');
};

/**
 * vue 获取url中的参数
 * @params name 需要从url中获取的字段名称
 * @describe 获取 url 中的参数
 */
export const getUrlKey = (name: string) => {
  let reg: any = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)');
  let str: any = (reg.exec(location.href) || [, ''])[1].replace(/\+/g, '%20');
  return decodeURIComponent(str) || null;
};

/**
 * 将json对象转换为 FormData类型
 * @param data 【参数是json对象】
 * @return [返回 FormData类型 的值]
 */
export const transformDataToFormData = (data: any) => {
  let form = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] instanceof Array) {
      data[key].forEach((value: any) => {
        form.append(key, value);
      });
    } else {
      form.append(key, data[key]);
    }
  });
  return form;
};

/**
 * 存储 localStorage
 */
export const localStorageSet = (name: string, content: string) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取 localStorage
 */
export const localStorageGet = (name: string) => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除 localStorage
 */
export const localStorageRemove = (name: string) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 存储 localStorage
 */
export const setLS = (name: string, content: string) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取 localStorage
 */
export const getLS = (name: string) => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
};

/**
 * 删除 localStorage
 */
export const removeLS = (name: string) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * randomWord 产生任意长度随机字母数字组合
 * randomFlag 是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 */
export const randomWord = (randomFlag: any, min: any, max: any) => {
  let str = '',
    range = min,
    arr = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};

/**
 *  utf8 编码
 */
export const encodeUTF8 = (s: any) => {
  let i,
    r: any = [],
    c,
    x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xc0 + ((c >> 6) & 0x1f), 0x80 + (c & 0x3f));
    else {
      if ((x = c ^ 0xd800) >> 10 == 0)
        //对四字节UTF-16转换为Unicode
        (c = (x << 10) + (s.charCodeAt(++i) ^ 0xdc00) + 0x10000),
          r.push(0xf0 + ((c >> 18) & 0x7), 0x80 + ((c >> 12) & 0x3f));
      else r.push(0xe0 + ((c >> 12) & 0xf));
      r.push(0x80 + ((c >> 6) & 0x3f), 0x80 + (c & 0x3f));
    }
  return r;
};

/**
 **  字符串加密成 hex 字符串
 */
export const sha1 = (s: any) => {
  let data = new Uint8Array(encodeUTF8(s));
  let i, j, t;
  let l = (((data.length + 8) >>> 6) << 4) + 16;
  s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), (s = new Uint32Array(s.buffer));
  for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  let m: any = [1732584193, -271733879, null, null, -1009589776];
  let k: any = [1518500249, 1859775393, -1894007588, -899497514];
  let w: any = [],
    f = [
      function () {
        return (m[1] & m[2]) | (~m[1] & m[3]);
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      },
      function () {
        return (m[1] & m[2]) | (m[1] & m[3]) | (m[2] & m[3]);
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      },
    ],
    rol = function (n: any, c: any) {
      return (n << c) | (n >>> (32 - c));
    };
  (m[2] = ~m[0]), (m[3] = ~m[1]);
  for (i = 0; i < s.length; i += 16) {
    let o = m.slice(0);
    for (j = 0; j < 80; j++)
      (w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1)),
        (t = (rol(m[0], 5) + f[(j / 20) | 0]() + m[4] + w[j] + k[(j / 20) | 0]) | 0),
        (m[1] = rol(m[1], 30)),
        m.pop(),
        m.unshift(t);
    for (j = 0; j < 5; j++) m[j] = (m[j] + o[j]) | 0;
  }
  t = new DataView(new Uint32Array(m).buffer);
  for (let i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

  let hex = Array.prototype.map
    .call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
      return (e < 16 ? '0' : '') + e.toString(16);
    })
    .join('');
  return hex;
};

/**
 * 获取 路由 键值对
 * @params IGetRoutObj
 * @return
 */
declare interface IGetRoutObj {
  path: string;
  name: string;
}
declare interface IGetRoutObjRtn<T = IGetRoutObj> {
  path: string;
  children: T[];
}
export const getRoutObj = (childRoutObj: any) => {
  let routePropObj: IGetRoutObjRtn = {
    path: '',
    children: [],
  };

  // 设置 父级 path 名字
  routePropObj.path = childRoutObj.path;

  // 设置 子级 路由
  childRoutObj.children.map((item: any) => {
    let path = item.path;
    if (path.indexOf('/') < 0) {
      path = `/${item.path}`;
    }
    let itemObj = {
      name: item.name,
      path: path,
    };
    routePropObj.children.push(itemObj);
  });

  return routePropObj;
};

/**
 * 保留小数点 2 位
 * @params value
 * @return
 */
export const returnFloat = (val: any) => {
  let value: any = Math.round(parseFloat(val) * 100) / 100;
  let s = value.toString().split('.');
  if (s.length == 1) {
    value = value.toString() + '.00';
    return value;
  }
  if (s.length > 1) {
    if (s[1].length < 2) {
      value = value.toString() + '0';
    }
    return value;
  }
};

/**
 * 金额千分位
 * @params value
 * @return string
 * */
export const moneyFor = (val = 0) => {
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  var str = Number(val).toFixed(2) + '';
  var intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
  var dot = str.substring(str.length, str.indexOf('.')); //取到小数部分搜索
  var ret = intSum + dot;
  return ret;
};

/**
 * 深克隆
 * @params target
 * @return object
 * */
export const deepClone = (target: any) => {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      if (target.length > 0) {
        for (let i in target) {
          // 递归克隆数组中的每一项
          result.push(deepClone(target[i]));
        }
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  return result;
};

/**
 * 数组去重
 * @params arr
 * @params key
 * */ 
export const ArrayDeduplicate = (arr: Array<any>, key: string) => {
  let obj: any = {};
  return arr.reduce(function (a, b) {
    obj[b[key]] ? '' : (obj[b[key]] = true && a.push(b));
    return a;
  }, []);
};

/**
 * 动态插入 script 标签
 * @params url
 * @params callback
 * */ 
export const createScript = (url: string, callback?) => {
  if (!url) return;

  let script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = url;

  /*
  ** script标签的onload和onreadystatechange事件
  ** IE6/7/8支持onreadystatechange事件
  ** IE9/10支持onreadystatechange和onload事件
  ** Firefox/Chrome/Opera支持onload事件
  */

  // 判断IE8及以下浏览器
  var isIE = !-[1,];
  if (isIE) {
    script.onreadystatechange = function () {
      if (this.readyState == 'loaded' || this.readyState == 'complete') {
        callback && callback();
      }
    }
  } else {
    // IE9及以上浏览器，Firefox，Chrome，Opera
    script.onload = function () {
      callback && callback();
    }
  }

  document.body.appendChild(script);
}