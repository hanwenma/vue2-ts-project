import store from '@/store';
// 引入英文语言包
import { Locale as VantLocale } from 'vant';
import enLocale from 'vant/es/locale/lang/en-US';
import zhLocale from 'vant/es/locale/lang/zh-CN';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { en } from './en';
import { zh } from './zh';

Vue.use(VueI18n);

const messages: any = {
  en: {
    ...en,
    ...enLocale,
  },
  zh: {
    ...zh,
    ...zhLocale,
  },
};

/** i18n */
const i18n: any = new VueI18n({
  locale: store.state.locale || 'zh',
  messages,
});

// 配置vant-ui的组件国际化
if (store.state.locale && store.state.locale === 'zh') {
  VantLocale.use('zh-CN', zhLocale);
} else {
  VantLocale.use('en-US', enLocale);
}

export default i18n;
