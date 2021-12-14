import { clearCache } from '@utils/tools';
import { MIME } from './commonType';
import moment from 'moment';
import * as Cookies from 'js-cookie';

export default class RtnFilter {
  /**
   * 对返回值进行过滤
   * @param getData 异步请求
   */
  protected static async filetr(response: any) {
    try {
      // 检查状态码
      const status = RtnFilter.checkStatus(response);
      if (status) {
        RtnFilter.setToken(response); // 设置token
        const rtnData = await RtnFilter.parseResult(response); // 返回数据类型
        return RtnFilter.checkBusinessStatus(rtnData); // 业务状态码处理
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 检查状态码
   * @param response
   */
  private static checkBusinessStatus(rtnData: any) {
    switch (rtnData.code) {
      case 2000:
        return rtnData.data;
      case 2001:
        RtnFilter.pop(`${rtnData.code} 登录状态异常`, `登录失败，请联系管理员！`); // 错误提示
        RtnFilter.goLoginPage(); // 跳转password页
        return;
      case 2002:
        RtnFilter.pop(`${rtnData.code} 登录状态异常`, `您的Token已无效！`); // 错误提示
        RtnFilter.goLoginPage(); // 跳转password页
        return;
      case 2003:
        RtnFilter.pop(`${rtnData.code} 登录状态异常`, `您的Token已无效！`); // 错误提示
        RtnFilter.goLoginPage(); // 跳转password页
        return;
      default:
        RtnFilter.pop(`${rtnData.code} 系统异常`, rtnData.message); // 错误提示
        RtnFilter.goLoginPage(); // 跳转password页
        return;
    }
  }

  /**
   * 检查状态码
   * @param response
   */
  private static checkStatus(response: any) {

    //检查响应状态
    if (response.status >= 200 && response.status < 300) {
      //响应成功
      return true;
    } else {
      RtnFilter.pop(response.status, response.statusText); // 错误提示
      RtnFilter.goLoginPage(); // 跳转页面
    }
  }

  /**
   * 判断数据类型
   * @param response
   */
  private static async parseResult(response: any) {
    //解析返回的结果
    const contentType = response.headers.get('Content-Type');

    if (contentType != null) {
      if (contentType.indexOf('text') > -1) {
        return await response.text();
      }
      if (contentType.indexOf('form') > -1) {
        return await response.formData();
      }
      if (contentType.indexOf('video') > -1) {
        return await RtnFilter.exportFile(response);
      }
      if (contentType.indexOf('json') > -1) {
        return await response.json();
      }
    }
    return await response.text();
  }

  /**
   * 导出/下载 文件
   */
  private static async exportFile(response: any) {
    response.blob().then((blob: any) => {
      // 返回文件描述
      let contentDisposition = response.headers.get('Content-Disposition');
      if (!contentDisposition) {
        const time = new Date();
        contentDisposition = `;filename=下载文件_${moment(time).valueOf()}.zip`; // 默认文件
      }
      // 文件名与后缀
      const fileName = window.decodeURI(contentDisposition.split('filename=')[1]);
      // 文件后缀
      const suffix: string = fileName.split('.')[1];
      const type: string = MIME[suffix];

      const link = document.createElement('a');
      const downUrl = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
      link.style.display = 'none';
      link.href = URL.createObjectURL(blob); //创建url对象
      link.download = fileName; //下载后文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); //销毁url对象
    });
  }

  /**
   * 跳转登录页
   */
  private static goLoginPage() {
    clearCache();
  }

  /**
   * 提示
   * @param title
   * @param info
   */
  private static pop(title: string, info: string) {
    alert(`${title} --> ${info}`);
  }

  /**
   *  保存token
   * @param response
   */
  private static setToken(response: any, tokenKey:string = 'access-token') {
    // 某些项目会将token放到请求头
    const accessToken = response.headers.get(tokenKey);
    if (accessToken) {
      Cookies.set('token', accessToken);
    }
  }
}
