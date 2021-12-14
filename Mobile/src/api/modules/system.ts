import ApiUrl from '@api/url';
import { post } from '@utils/request';

/**
 * 获取用户角色
 * @param params
 */
export const getUserRole = async () => {
  return {};
  // const res = (await post(ApiUrl.getUserRole, {})) as any;
  // console.log(' getUserRole >>>>>>>>>> ', res.data);
  // if (res.data.code == 2000) {
  //   return res.data.data;
  // } else {
  //   return [];
  // }
};

/**
 * 获取用户信息
 * @param params
 */
export const getUser = async () => {
  return {
    id: 333,
    name: '张三',
    fullName: '张三（zs）',
  };
  // const res = (await post(ApiUrl.getUser, {})) as any;
  // console.log(' getUser >>>>>>>>>> ', res.data);
  // if (res.data.code == 2000) {
  //   return res.data.data;
  // } else {
  //   return [];
  // }
};

/**
 * 登陆获取Tiket
 * @param {
 *  sysId [1：登入，2登出]
 *  url [跳转的URL]
 * }
 * @return data [还有ticket的url]
 */
declare interface GetLoginUrlType<T = any> {
  sysId: number;
  url: string;
}
export async function getLoginUrl<T>(params: GetLoginUrlType) {
  return (await post(ApiUrl.getLoginUrl, params)) as any;
}

/**
 * 获取TOKEN
 * @param {
 *  ticket [TICKET]
 * }
 * @return data [组装的TOKEN对象]
 */
declare interface GetTokenByTicketType<T = any> {
  ticket: string;
}
export async function getTokenByTicket(params: GetTokenByTicketType) {
  return (await post(ApiUrl.getTokenByTicket, params)) as any;
}
