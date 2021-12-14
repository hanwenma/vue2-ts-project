// 国际化
import i18n from '@/lang';
import router from '@/router';
import store from '@/store';
import 'nprogress/nprogress.css'; // 加载动作条样式
import Vue from 'vue';
import VConsole from 'vconsole';
import Rem from '@/utils/rem';
import App from '@/views/App.vue';
import plugins from '@/global/uiConfig';
import '@/styles/index.less'; // 初始化样式

Rem(window, 750); // rem 换算

Vue.config.productionTip = false;

if(process.env.VUE_APP_API_ENV !== 'prod'){
  new VConsole({});
}

Vue.use(plugins);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
