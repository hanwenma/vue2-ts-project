import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
// ********* 页面 *********
import home from './routes/home';
import list from './routes/list';

const baseConfig = require('@build/webpack.base.conf.js');
const envConf = baseConfig[process.env.VUE_APP_API_ENV];
Vue.use(Router);

/**
 * 路由按需引入
 * 注意：
 *  1. 路由定义的命必须跟接口返回的 menuKey字段值 一致, 并且区分大小写
 *    （  比如：
 *        menuKey:"Home"  则定义时这么定意思
 *        const Home => import("@/views/home");
 *     ）
 *  2. 接口路由只对主路由(即，path:"/"）下的子路由有效
 */

// ********* 布局 *********
const Layout = () => import('@/components/Layout');
const errorPage = () => import('@/views/errorPage');

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home',
    name: 'Platform Name',
    component: Layout, // 公共布局组件
    children: [
      home, // home 模块路由
      list, // list 模块路由
    ],
  },
  {
    path: '*',
    name: '无效路由',
    component: errorPage,
  },
];

const router = new Router({
  mode: 'hash', // 分为 hash（地址栏#号） 和 history（ 利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法，此方式需要浏览器的支持，而且需要后端配合,才能达到预期效果）
  base: envConf.publicPath, // 应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes,
});

// 全局前置路由
router.beforeEach(async (to: any, from, next) => {
  window.document.title = `${to.name || to.meta.titleName}`;
  next();
});

// 全局后置路由
// router.afterEach((to: any) => {
//    do something
// });

export default router;
