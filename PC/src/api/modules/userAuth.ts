import ApiUrl from '@api/url';
import { get } from '@utils/request';
import { localStorageSet } from '@/utils/tools';
/**
 * 获取用户菜单
 * @param params
 */
export const getCurrentUserMenu = async (params: any = "") => {
  return await get(ApiUrl.getCurrentUserMenu, params, true);
};

/**
 * 用户信息
 * @param params
 */
export const getUserInfo = async (params: any = "") => {
  let res = await get(ApiUrl.getUserInfo, params, true);
  if (res.code === 2000 && res.data) {
    localStorageSet('cost-userInfo', JSON.stringify(res.data));
    return res.data
  }
};
