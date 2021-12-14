import store from '@/store';
import ElementLocale from 'element-ui/lib/locale';
// 引入element-ui的语言包
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
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

// 配置element-ui的组件国际化
ElementLocale.i18n((key: any, value: any) => i18n.t(key, value));

export default i18n;
