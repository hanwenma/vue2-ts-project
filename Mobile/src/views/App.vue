<template>
  <router-view></router-view>
</template>

<script lang="ts">
import * as Cookies from 'js-cookie';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {getQueryString} from '@/utils/tools';

@Component({})

export default class App extends Vue {
  mounted() {
    // 国际化 默认中文:  zh-CN 中文  en-EN 英文
    if (!Cookies.get('language')) {
      Cookies.set('language', 'zh-CN');
    }

    let language = getQueryString('language');
    const lang = language === 'CN' ? 'zh' : 'en';

    // 国际化 默认英文:  zh-CN 中文  en-EN 英文
    Cookies.set('language', language === 'CN' ? 'zh-CN' : 'en-EN');
    this.$i18n.locale = lang;
    this.$store.commit('setLang', lang);
  }
}
</script>
