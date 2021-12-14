import { CookiesTool } from '@/utils/tools';
import AuthOA from '@/utils/auth/usr';

/**
 * 是否需要判断登录态
 * @param to
 * @param from
 * @param next
 */
export const isNeedLogin = async (to: any, from: any, next: any) => {
  const token = CookiesTool.get('token');
  if (token) {
    next();
  } else {
    new AuthOA(to, from, next);
  }
};
