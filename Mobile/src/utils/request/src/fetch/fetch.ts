import { MIME, Charset, HttpMethod } from '../commonType';
import { CookiesTool } from '@/utils/tools';
import RtnFilter from '../filter';
// 全局配置
const EnvBaseConf = require('@build/webpack.base.conf.js'); // eslint-disable-line
const EnvConf = EnvBaseConf[process.env.VUE_APP_API_ENV];

export class FetchRequest extends RtnFilter {
  constructor() {
    super();
  }

  /**
   * 拼接请求头
   * @param params
   */
  private static getHeader(params: object) {
    let tkHeader: object = {
      'SK-Name': 's2-ajax',
      'SK-Version': '1.0.0',
    };

    // 判断参数是否为formData类型
    let contentType = `${MIME.json};${Charset.utf}`;
    if (params instanceof FormData) {
      contentType = `${MIME.form};${Charset.utf}`;
    }

    const token = CookiesTool.get('token') || '';

    // token 不为空时设置
    if (token) {
      tkHeader = {
        Authorization: token,
        'Content-token': token,
      };
    }

    // 请求头
    const headers = {
      Accept: MIME.any, // 表示请求方希望的资源类型，或者能解析识别的类型
      'Content-Type': contentType, // 表示实际发送的资源类型
      ...tkHeader,
    };

    return headers;
  }

  /**
   *  fetch请求
   * @param url 请求链接
   * @param params  参数
   * @param method 方法
   * @param header 头部信息
   */
  protected static async ajax<T>(url: string, params: any, method: HttpMethod) {
    const reqUrl = url.replace('//', '/'); // 防止url中出现双 /
    const headers = FetchRequest.getHeader(params); // 设置头
    const fetchReq = await fetch(reqUrl, {
      method: method,
      credentials: 'include',
      headers,
      body: params,
    });

    return super.filetr(fetchReq); // 对返回值进行过滤处理
  }
}
