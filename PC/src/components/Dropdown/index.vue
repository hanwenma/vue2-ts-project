<template>
  <span v-if="type == 'text'" @click="handleClick" class="text">
    {{ actions === 'en-EN' ? langObj['zh-CN'] : langObj['en-EN'] }}
  </span>
  <el-select v-else class="t-dropdown-link" @change="changeLang" v-model="actions">
    <el-option v-for="item in dropdownArr" :key="`${item.value}_${item.value}`" :label="item.name" :value="item.value">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import * as Cookies from 'js-cookie';

@Component({})
/** 语言选择 */
export default class ComponentSelectLang extends Vue {
  @Prop({})
  type: string = 'text';

  actions: string = 'en-EN';
  langObj: any = {
    'zh-CN': '中文', //这里不需要翻译
    'en-EN': 'English',
  };
  dropdownArr: any[] = [
    { name: this.$t('中文'), value: 'zh-CN' },
    { name: this.$t('英文'), value: 'en-EN' },
  ]; // 默认英文 zh-CN 中文  en-EN 英文

  handleClick() {
    this.actions = this.actions === 'zh-CN' ? 'en-EN' : 'zh-CN';
    this.changeLang();
  }

  /** 监听切换 */
  public changeLang() {
    Cookies.set('language', this.actions);
    window.location.reload();
  }

  /** 钩子函数 */
  private mounted() {
    const cookieLang = Cookies.get('language') || 'en-EN';
    this.actionsSetting(cookieLang);
    this.actions = cookieLang;
  }

  /** 设置语言 */
  public actionsSetting(val: any) {
    Cookies.set('language', val);
    const locale: string = val === 'zh-CN' ? 'zh' : 'en';
    this.$i18n.locale = locale;
    this.$store.commit('setLang', locale);
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
