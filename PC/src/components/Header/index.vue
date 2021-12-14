<template>
  <div class="s2h5-headbg">
    <div class="s2h5-headbg-head">
      <router-link to="/home" tag="div" class="s2h5-headbg-head-logo">
        <el-image fit="fit" class="logo" :src="logoSrc"></el-image>
      </router-link>
      <div class="s2h5-headbg-head-right">
        <SvgIcon svgName="lang" className="spherical" />
        <Dropdown type="text" />
        <span class="split">|</span>
        <span>{{ linkObj.deptment }}</span>
        <img :src="linkObj.link" class="avatar" @error="defaultImg" />
        <span>{{ linkObj.name }}</span>
        <span class="split">|</span>
        <a>
          <span @click="toQuit()">{{ $t('退出') }}</span>
        </a>
      </div>
    </div>
    <div class="s2h5-headbg-menubg">
      <div class="s2h5-headbg-menubg-menu">
        <slot name="menu"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import * as Cookies from 'js-cookie';
import Dropdown from '@/components/Dropdown';

@Component({
  components: {
    Dropdown,
  },
})
export default class ComponentHeader extends Vue {
  lang: string = '';

  mounted() {
    // 取语言环境
    const nowLg: string = Cookies.get('language') || 'en-EN';
    this.lang = nowLg === 'zh-CN' ? 'zh' : 'en';
  }

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  companyName;

  @Prop({
    required: true,
    default: '',
  })
  logoSrc;

  @Prop() linkObj?: any;

  defaultImg() {
    this.linkObj.link = require('@/assets/images/avatar.png');
  }

  toQuit() {
    // 清空登录态
    Cookies.set('token', '');
    Cookies.set('userName', '');
    window.location.href = `${window.location.origin}/_logout/?url=${window.location.origin}/#${this.$route.fullPath}`;
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
<style lang="less">
@import './reset.less';
</style>
