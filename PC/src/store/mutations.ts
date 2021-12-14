
const mutations = {
  setLang(state: any, locale: string): void {
    // 国际化
    if (state.locales.includes(locale)) {
      state.locale = locale;
    }
  },
};

export default mutations;
