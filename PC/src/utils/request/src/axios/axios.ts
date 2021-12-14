import axios from 'axios';
import * as Cookies from 'js-cookie';
import { closeLoading, showLoading } from './loading';
// 全局配置
const envConf = require('@build/webpack.base.conf.js'); // eslint-disable-line
const envConfVal = envConf[process.env.VUE_APP_API_ENV];
const isDevelopment = process.env.VUE_APP_API_ENV === 'dev';

interface LooseObject {
  [key: string]: any;
}

// 扩展名 : MIME类型
const FileType: LooseObject = {
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  csv: 'text/csv',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  rar: 'application/x-rar-compressed',
  pdf: 'application/pdf',
  zip: 'application/zip',
  ofd: 'application/ofd',
};

/**
 * 创建 JSON axios对象
 * @param fn 扩展回调
 */
const createAxiosObj = (url: string, headers: any, params: any, reqConf?: any) => {

  let baseURL = '';

  // 开发环境指定 apiUrl
  if (isDevelopment) {
    baseURL = envConfVal.apiHost;
  }

  // 创建axios实例
  const service = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL，通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL, // api 的 base_url
    timeout: 60000, // 请求超时时间
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: reqConf.responseType,
  });

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  service.interceptors.request.use(
    (config: any) => {
      config.data = params;
      if (config.url === '/applyOrder/commit') {
        showLoading();
      }
      config.headers = {
        ...headers,
        'x-cost-language': Cookies.get('language'),
      };
      return config;
    },
    (error: any) => {
      console.log("axios request error >>>>>>>>> ", error);
    },
  );

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  service.interceptors.response.use(
    (config: any) => {

      // 下载
      if (reqConf.responseType == 'blob') {
        autoDonwload(config);
      }

      // 设置 token
      if (config.headers['access-token']) {
        Cookies.set('token', config.headers['access-token']);
      }

      return config;
    },
    (error: any) => {
      console.log(' axios 网络异常 error >>>>>>>>> ', error.response, url);
      closeLoading();
      if (error.response.status === 401) {
        window.location.reload();
      }
      return error.response.data;
    },
  );

  return service;
};

/**
 * 自动下载
 * @param reqConf【请求配置】
 * @param config 【响应配置】
 */
function autoDonwload(config: any) {
  // 返回文件名
  let contentDisposition = config.headers['content-disposition'];
  if (!contentDisposition) {
    contentDisposition = `;filename=${decodeURI(config.headers.filename)}`;
  }
  const fileName = window.decodeURI(contentDisposition.split(`filename=`)[1]);

  // 文件类型
  const suffix: string = fileName.split('.')[1];

  let type: string = FileType[suffix];

  if (!type) {
    type = FileType.zip;
  }

  const link = document.createElement('a');
  const blob = new Blob([config.data], {
    type: FileType[suffix],
  });

  link.style.display = 'none';
  link.href = URL.createObjectURL(blob); //创建url对象
  link.download = fileName; //下载后文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href); //销毁url对象
}

/**
 * Post请求
 * @param url 【链接】
 * @param params【参数】
 * @param token
 * @param fn【回调】
 */
const post = (url: string, params: any) => {
  const headers: LooseObject = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const reqConf: LooseObject = {
    responseType: 'json',
  };

  const axiosObj = createAxiosObj(url, headers, params, reqConf);
  return axiosObj.post(url);
};

/**
 * Post请求
 * @param url 【链接】
 * @param params【参数】
 * @param token
 * @param fn【回调】
 */
const file = (url: string, params: any) => {
  const headers: LooseObject = {
    'Content-Type': 'multipart/form-data',
  };
  const reqConf: LooseObject = {
    responseType: 'json',
  };

  const axiosObj = createAxiosObj(url, headers, params, reqConf);
  return axiosObj.post(url);
};

/**
 * Post请求
 * @param url 【链接】
 * @param params【参数】
 * @param token
 * @param fn【回调】
 */
const fileDownload = (url: string, params: FormData, method?: string) => {
  const headers: LooseObject = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };

  const reqConf: LooseObject = {
    responseType: 'blob',
  };

  const axiosObj = createAxiosObj(url, headers, params, reqConf);

  return method === 'get' ? axiosObj.get(url) : axiosObj.post(url);
};

/**
 * get请求
 * @param url 【链接】
 * @param params【参数】
 * @param token
 * @param fn【回调】
 */
const get = (url: string, params: any) => {
  const headers: LooseObject = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const reqConf: LooseObject = {};

  const axiosObj = createAxiosObj(url, headers, params, reqConf);
  return axiosObj.get(url, { params });
};

export default {
  get,
  post,
  file,
  fileDownload,
};
