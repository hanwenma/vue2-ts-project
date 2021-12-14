// 常用MIME
export const MIME: any = {
  any: '*/*', // 任意类型的 MIME 类型
  // ********* 常用媒体格式类型 *********
  text: 'text/plain', // 文本文件默认值
  css: 'text/css', // 在网页中要被解析为CSS的任何CSS文件必须指定MIME为text/css
  html: 'text/html', // 所有的HTML内容都应该使用这种类型
  js: 'text/javascript', // 据 HTML 标准，应该总是使用 MIME 类型 text/javascript 服务 JavaScript 文件
  image: 'image/*', // 图片类型
  audio: 'audio/*', // 音频类型
  video: 'video/*', // 视频类型
  json: 'application/json', // json类型
  pdf: 'application/pdf', // pdf格式
  doc: 'application/msword', // Word文档格式
  stream: 'application/octet-stream', // 二进制流数据（如常见的文件下载）
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  // ********* form 相关 *********
  form: 'application/x-www-form-urlencoded', // 原生form表单中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
  mform: 'multipart/form-data', // 需要在表单中进行文件上传时使用
  ofd: 'application/ofd', // 发票
};

export enum Charset {
  utf = 'charset=UTF-8',
  gbk = 'charset=GBK',
}

// 请求类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// 请求 头部
export interface ReqHeadType {
  Accept: string;
  'Content-Type': string;
  token?: string;
}
