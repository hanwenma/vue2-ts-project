import request from './axios';
import statusCode from './statusCode';

/**
 * 返回类型
 */
declare interface RtnType<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp?: number;
}

/**
 * post 请求
 * @url  url [请求链接]
 * @params  params [参数]
 * @params  allowUnToken [是否允许为空]
 * @params  fn [回调函数]
 * @return [返回值]
 */
export async function post(url: string, params: any, isLoading?: boolean) {
  let rtn: RtnType = {
    code: 50001,
    message: statusCode[50001],
    data: {},
  };

  // 判断 参数是否为空
  if (!params) {
    params = {};
  }
  const rtnData: any = await request.post(url, params);
  // // console.log('post >>>>> rtnData: ', rtnData);

  if (rtnData.status == 200) {
    rtn = rtnData.data;
  } else {
    if (rtnData.message) rtn.message = rtnData.message;
  }
  // // console.log("post >>>>> rtn: ", rtn);
  return rtn;
}

/**
 * formdata 请求
 * @url  url [请求链接]
 * @params  params [参数]
 * @params  allowUnToken [是否允许为空]
 * @params  fn [回调函数]
 * @return [返回值]
 */
export async function upload(url: any, params: any, isLoading?: boolean) {
  let rtn: RtnType = {
    code: 90002,
    message: statusCode[90002],
    data: {},
  };
  
  // 判断 参数是否为空
  if (!params) {
    params = {};
  }

  // 将参数转换为 fromdata 类型
  const formData = new FormData();
  formData.append('files', params);

  // console.log('file  >>>>>>>>> isCanReq: ', isCanReq);
  // console.log('file  >>>>>>>>> formData: ', formData);
  const rtnData: any = await request.file(url, formData);
  console.log('upload file  >>>>>>>>> rtnData: ', rtnData);

  if (rtnData.data) {
    rtn = rtnData.data;
  } else if(rtnData.message){
    rtn = rtnData;
  }
  // console.log("file >>>>> rtn: ", rtn);
  return rtn;
}

/**
 * 下载 请求
 * @url  url [请求链接]
 * @params  params [参数]
 * @params  allowUnToken [是否允许为空]
 * @params  fn [回调函数]
 * @return [返回值]
 */
export async function download(url: any, params: any, isLoading?: boolean) {
  const rtn: RtnType = {
    code: 90004,
    message: statusCode[90004],
    data: {},
  }
  
  // 判断 参数是否为空
  if (!params) {
    params = {};
  }

  const rtnData: any = await request.fileDownload(url, params);

  if (rtnData.data) {
    rtn.code = 2000;
    rtn.message = statusCode[2000];
  } else {
    rtn;
  }

  return rtn;
}

/**
 * get 请求
 * @url  url [请求链接]
 * @params  params  [参数]
 * @params  allowUnToken [是否允许为空]
 * @params  repType [表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream']
 * @params  fn [回调函数]
 * @return [返回值]
 */
export async function get(url: any, params: any, isLoading?: boolean) {
  let rtn: RtnType = {
    code: 90003,
    message: statusCode[90003],
    data: {},
  };
  

  // 判断 参数是否为空
  if (!params) {
    params = {};
  }

  const rtnData: any = await request.get(url, params);
  if (rtnData.data) {
    rtn = rtnData.data;
  } else {
    rtn;
  }

  return rtn;
}