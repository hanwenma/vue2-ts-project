/**
 * 获取url中的参数
 * @params key 需要从url中获取的字段名称
 * @describe 获取url中的参数
 */
export const getQueryString = (key: string) => {
  let { href } = window.location;
  href = href.replace(/#\/.+/, '');
  var src = href.split("?");
  if (src[0] == href) {
    return "";
  }
  var arr = src[1].split("&");
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var arr1 = arr[i].split("=");
    obj[arr1[0]] = arr1[1];
  }
  return (obj[key] || '').replace(/(\/|#).?/g, '');
};

/**
 * vue 获取url中的参数
 * @params name 需要从url中获取的字段名称
 * @describe 获取url中的参数
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
  // console.log(' axios  将参数转为 formdata 类型  >>>>>>>>> ', data);
  let form = new FormData();
  Object.keys(data).forEach((key) => {
    // console.log(' (data[key] instanceof Array)  >>>>>>>>> ', data[key] instanceof Array);
    // console.log('key >>>>>>>>>: ', key);
    // console.log('data[key] >>>>>>>>>: ', data[key]);
    if (data[key] instanceof Array) {
      data[key].forEach((value: any) => {
        form.append(key, value);
      });
    } else {
      form.append(key, data[key]);
    }
  });

  // console.log('form >>>>>>>>>: ', form);
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
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
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
 **  utf8 编码
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

// 金额千分位
export const moneyFor = (val = 0) => {
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  var str = Number(val).toFixed(2) + '';
  var intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
  var dot = str.substring(str.length, str.indexOf('.')); //取到小数部分搜索
  var ret = intSum + dot;
  return ret;
};

// 通过 gasGuid 合并同一张图片的发票信息
export const getSameInvoiceByGasGuid = (dataArr: Array<object> = []) => {
  let newDataObj: object = {};
  let newDataArr: Array<object> = [];

  if (!Array.isArray(dataArr)) return [];

  dataArr.map((item: any) => {
    if (newDataObj[item.gasGuid]) {
      newDataObj[item.gasGuid].sameGasGuid.push({
        id: item.id,
        ocrIdentifyResult: item.ocrIdentifyResult,
        statusCode: item.statusCode,
        currency: item.currency,
        invoiceAmt: item.invoiceAmt,
        invoiceType: item.invoiceType,
      });
    } else {
      item.sameGasGuid = [
        {
          id: item.id,
          ocrIdentifyResult: item.ocrIdentifyResult,
          statusCode: item.statusCode,
          currency: item.currency,
          invoiceAmt: item.invoiceAmt,
          invoiceType: item.invoiceType,
        },
      ];
      newDataObj[item.gasGuid] = item;
    }
  });

  for (let key in newDataObj) {
    newDataArr.push(newDataObj[key]);
  }

  return newDataArr;
};

// 整数保留两位 四位小数
export const NumberCheck = (num, limit) => {
  var str = num;
  var len1 = str.substr(0, 1);
  var len2 = str.substr(1, 1);
  //如果第一位是0，第二位不是点，就用数字把点替换掉
  if (str.length > 1 && len1 == 0 && len2 != '.') {
    str = str.substr(1, 1);
  }
  //第一位不能是.
  if (len1 == '.') {
    str = '';
  }
  //限制只能输入一个小数点
  if (str.indexOf('.') != -1) {
    var str_ = str.substr(str.indexOf('.') + 1);
    if (str_.indexOf('.') != -1) {
      str = str.substr(0, str.indexOf('.') + str_.indexOf('.') + 1);
    }
  }
  //正则替换
  str = str.replace(/[^\d^\.]+/g, ''); // 保留数字和小数点
  if (limit === 2) {
    str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1'); // 小数点后只能输 2 位
  }
  if (limit === 4) {
    str = str.replace(/^\D*([0-9]\d*\.?\d{0,4})?.*$/, '$1'); // 小数点后只能输 4 位
  }
  return str;
};

// 兼容 Android 端设置 cookie
export const CookiesTool = {
  set: function (key: string, val: string, time?) {
    //设置cookie方法
    var date: any = new Date(); //获取当前时间
    var expiresDays = time || 7; //将date设置为n天以后的时间
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
    document.cookie = key + '=' + val + ';expires=' + date.toGMTString(); //设置cookie
  },
  get: function (key: string) {
    //获取cookie方法
    /*获取cookie参数*/
    var getCookie = document.cookie.replace(/[ ]/g, ''); //获取cookie，并且将获得的cookie格式化，去掉空格字符
    var arrCookie = getCookie.split(';'); //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    var tips; //声明变量tips
    for (var i = 0; i < arrCookie.length; i++) {
      //使用for循环查找cookie中的tips变量
      var arr = arrCookie[i].split('='); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
      if (key == arr[0]) {
        //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        tips = arr[1]; //将cookie的值赋给变量tips
        break; //终止for循环遍历
      }
    }
    return tips;
  },
};

/**
 * 清空登录缓存
 */
export const clearCache = () => {
  CookiesTool.set('token', '');
  CookiesTool.set('userName', '');
};