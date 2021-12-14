// 国际化
import i18n from '@/lang';
import router from '@/router';
import store from '@/store';
import App from '@/views/App.vue';
import Vue from 'vue';
import uiConfig from '@/global/uiConfig';
import '@/styles/index.less'; // 初始化样式

Vue.use(uiConfig);

Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
