/**
 * 所有 url 都放在这里统一管理
 */

const ApiUrl = {
  // ********* 系统管理 *********
  addInvoice: '/domestic/reimb/addInvoice', //  添加发票做 ORC 识别
  confirmAddInvoice: '/domestic/reimb/confirmAddInvoice', // 添加发票到票夹
  getInvoiceList: '/domestic/reimb/getInvoiceList', // 获取发票列表
  delInvoiceByGuid: '/domestic/reimb/delInvoice', // 根据 id 删除发票
  getSignature: '/v1/wechat/getSignature ', // 获取微信配置
  getCardSign: '/v1/wechat/getCardSign', // 获取微信配置
  getWeChatInvoiceList:'/v1/wechat/getWeChatInvoiceList', // 将卡包发票添加数据库
  upaperScanning: '/upaper/scanning/',// 查看 upaper 扫描结果
  getUser: '', //  获取用户信息
  getLoginUrl: '',
  getTokenByTicket: '',
};

export default ApiUrl;
