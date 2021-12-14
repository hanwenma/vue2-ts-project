import NProgress from 'nprogress'; // 引入nprogress插件
import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import home from './routes/home';


const baseConfig = require('@build/webpack.base.conf.js');
const envConf = baseConfig[process.env.VUE_APP_API_ENV];

Vue.use(Router);

const Layout = () => import('@/components/Layout');
const errorPage = () => import('@/views/errorPage');

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/index',
    name: 'Mobile',
    component: Layout,
    children: [
      home,  //首页模块路由
    ],
  },
  {
    path: '*',
    name: '404',
    component: errorPage,
  },
]; // 移动端

const router = new Router({
  mode: 'hash', // 分为 hash（地址栏#号） 和 history（ 利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法，此方式需要浏览器的支持，而且需要后端配合,才能达到预期效果）
  base: envConf.publicPath, // 应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes,
  // constantRouterMap,
});

router.beforeEach(async (to, from, next) => {

  window.document.title = `${to.name}`;

  NProgress.start(); // 设置加载进度条(开始..)

  next();
  // await isNeedLogin(to, from, next); // 登录过滤
});

router.afterEach((to) => {
  NProgress.done(); // 设置加载进度条(结束..)
});

export default router;
