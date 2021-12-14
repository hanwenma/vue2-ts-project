import { clearCache } from '@/utils/tools';
import { CookiesTool } from '@/utils/tools';
import moment from 'moment';
import { MIME } from './commonType';

export default class RtnFilter {
  /**
   * 对返回值进行过滤
   * @param getData 异步请求
   */
  protected static async filetr(response: any) {
    // console.log('>>>>>>>>>  filetr <<<<<<<<< ');
    // console.log('filetr >>>>>>>>>> fetchReq: ', response);

    try {
      // 检查状态码
      const status = RtnFilter.checkStatus(response);
      if (status) {
        RtnFilter.setToken(response); // 设置token
        const rtnData = await RtnFilter.parseResult(response); // 返回数据类型
        return RtnFilter.checkBusinessStatus(rtnData); // 业务状态码处理
      }
      // const dataPromise = await fetchReq.json();
      // // console.log(dataPromise);
    } catch (err) {
      // console.log(err);
    }
  }

  /**
   * 检查状态码
   * @param response
   */
  private static checkBusinessStatus(rtnData: any) {
    // console.log(' >>>>>>>>>> 业务处理 <<<<<<<<<< ');
    // console.log('>>>>>>>>>  rtnData : ', rtnData);
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
    // console.log('>>>>>>>>>  checkStatus <<<<<<<<< ');
    // console.log('>>>>>>>>>  response.status : ', response.status);

    //检查响应状态
    if (response.status >= 200 && response.status < 300) {
      //响应成功
      return true;
    } else {
      RtnFilter.pop(response.status, response.statusText); // 错误提示
      RtnFilter.goLoginPage(); // 跳转页面
    }
    // if (response.status === 301 || response.status === 302) {
    //   //重定向
    //   window.location = response.headers.get('Location');
    // }
    // const error: any = new Error(response.statusText);
    // error.data = response;
    // throw error;
  }

  /**
   * 判断数据类型
   * @param response
   */
  private static async parseResult(response: any) {
    // console.log('>>>>>>>>>  parseResult <<<<<<<<< ');

    //解析返回的结果
    const contentType = response.headers.get('Content-Type');
    // console.log('>>>>>>>>>  contentType : ', contentType);

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
      // // console.log('fileName >>>>>>>>> ', fileName);
      // 文件后缀
      const suffix: string = fileName.split('.')[1];
      // // console.log('suffix >>>>>>>>> ', suffix);
      const type: string = MIME[suffix];

      const link = document.createElement('a');
      const downUrl = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
      // let blob = new Blob([config.data], {
      //   type: FileType[suffix],
      // });
      // let time = new Date();
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
    // const OALoginUrl = `http://passport.oa.com/modules/passport/signin.ashx?appkey=6ed4670763a24c3e97b512ef8126aa9f&title=%E7%A8%8E%E5%8A%A1%E8%B4%AD%E6%B1%87%E5%B9%B3%E5%8F%B0&url=${encodeURIComponent(
    //   window.location.href,
    // )}`;
    // window.location.href = OALoginUrl;
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
  private static setToken(response: any) {
    // 某些项目会将token放到请求头
    const accessToken = response.headers.get('access-token');
    if (accessToken) {
      CookiesTool.set('token', accessToken);
    }
  }
}
