const isProduction = process.env.NODE_ENV == 'development'; // eslint-disable-line

import { getLoginUrl, getTokenByTicket } from '@/api/modules/system';
import { getQueryString } from '@/utils/tools';
import { CookiesTool } from '@/utils/tools';

export default class Auth<T> {
  to: any = {};
  from: any = {};
  next: any = {};

  constructor(to: T, from: T, next: any) {
    // console.log(' >>>>>>>>>> Auth <<<<<<<<<< ');
    this.to = to;
    this.from = from;
    this.next = next;
    this.logLastFiveRout(); // 记录最后5次路由
    this.oathFilter(); // 登录过滤
  }

  // 权限过滤
  async oathFilter() {
    // console.log('oathFilter >>>>>>>>> this.to.path: ', this.to.path);
    const haveRout = ['/error'].indexOf(this.to.path);
    if (haveRout < 0) {
      // // console.log("isNeedLogin rout.path >>>>>>>>> ", rout.path);
      // 判断cookie中token中的登录状态
      const token = CookiesTool.get('token') || '';
      // console.log('oathFilter token >>>>>>>>> ', token);
      if (token) {
        // 有登录态
        // console.log(' 有登录态>>>>>>>>>>>>>>>>>>>> ');
        const ticketStr = getQueryString('ticket');
        if (ticketStr) {
          // 如果有token 且有ticket需要删ticket
          this.toNextLastPath();
        }
        this.next();
      } else {
        // 需要登录
        await this.signIn();
      }
    }
  }

  /**
   * 登录
   */
  async signIn() {
    const ticketStr = getQueryString('ticket');
    // console.log('signIn >>>>>>>>>> ticketStr: ', ticketStr);

    if (ticketStr) {
      // 获取token
      const rtnToken: any = await getTokenByTicket({
        ticket: ticketStr,
      });
      // console.log('signIn >>>>>>>>>> rtnToken: ', rtnToken);

      if (rtnToken) {
        CookiesTool.set('token', rtnToken.token);
        CookiesTool.set('userName', rtnToken.userName);
        this.toNextLastPath();
        // this.next({ path: path });
      }
    } else {
      await this.getTicket();
    }
  }

  /**
   * 获取ticket
   */
  async getTicket() {
    // console.log('getTicket >>>>>>>>>> ');
    // 获取 ticketUrl
    const ticketUrl: any = await getLoginUrl({
      sysId: 1, // 登录
      url: window.location.href,
    });

    // console.log('getTicket >>>>>>>>>> ticketUrl : ', ticketUrl);

    if (ticketUrl) {
      // window.location.href = ticketUrl; // 跳转登录页
    }
  }

  /**
   * 跳转最后一次页面
   */
  toNextLastPath() {
    // console.log('toNextLastPath >>>>>>>>>> ');
    let path = '';
    // 获取登录前链接
    const lsToArr = window.localStorage.getItem('lsToArr');
    let routArr: string[] = [];
    if (lsToArr) {
      routArr = lsToArr.split('|');
      path = routArr[1];
    } else {
      path = '/home';
    }
    // 取消ticket 强制跳转
    window.location.href = `${window.location.origin}/pweb/#${path}`;
  }

  /**
   * 记录访问记录
   */
  logLastFiveRout() {
    const lsToArr = window.localStorage.getItem('lsToArr');
    let routArr: string[] = [];
    if (lsToArr) {
      routArr = lsToArr.split('|');
    }
    // console.log('>>>>>>>>>> routArr : ', routArr);
    // console.log('>>>>>>>>>> this.to : ', this.to);
    if (routArr[routArr.length] != this.to.fullPath) {
      routArr.unshift(this.to.fullPath); // 头部加入
      routArr.length = 5; // 最多保存5次记录
      window.localStorage.setItem('lsToArr', routArr.join('|'));
    }
    // window.localStorage.setItem("lsFromArr", this.from.path);
  }
}
