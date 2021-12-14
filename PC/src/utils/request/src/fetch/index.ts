import { FetchRequest } from './fetch';
import { transformDataToFormData } from '@/utils/tools';

export class Request extends FetchRequest {
  /**
   * Post请求
   * @param url 请求url
   * @param params 请求参数
   */
  static async post<T>(url: string, params: object) {
    return await super.ajax(url, JSON.stringify(params), 'POST');
  }

  /**
   * form请求
   * @param url
   * @param params
   */
  static async form<T>(url: string, params: object) {
    // 将参数转换为 fromdata 类型
    const paramsForm: FormData = transformDataToFormData(params);
    return await super.ajax(url, paramsForm, 'POST');
  }

  /**
   * 上传
   * @param url
   * @param params
   */
  static async upload<T>(url: string, params: Blob[]) {
    // 将参数转换为 fromdata 类型
    const file = new FormData();
    file.append('file', params[0]);
    return await super.ajax(url, file, 'POST');
  }

  /**
   * 下载
   * @param url
   * @param params
   */
  static async download<T>(url: string, params: object) {
    return await super.ajax(url, JSON.stringify(params), 'POST');
  }

  /**
   * Get请求
   * @param url
   * @param params
   */
  static async get<T>(url: string, params: object) {
    return await super.ajax(url, JSON.stringify(params), 'GET');
  }
}
