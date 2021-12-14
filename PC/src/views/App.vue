<template>
  <router-view></router-view>
</template>

<script lang="ts">
import * as Cookies from 'js-cookie';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
@Component({})
/** 根组件 */
export default class APP extends Vue {
  /** 钩子函数 */
  private mounted() {
    // 国际化 默认中文:  zh-CN 中文  en-EN 英文
    if (!Cookies.get('language')) {
      Cookies.set('language', 'zh-CN');
    }
    const nowLg: string = Cookies.get('language') as string;
    const lang = nowLg === 'zh-CN' ? 'zh' : 'en';
    this.$i18n.locale = lang;
    this.$store.commit('setLang', lang);
  }
}
</script>
<style lang="less">
.el-tooltip__popper.tip-width{
    max-width: 220px !important;
  }
</style>
