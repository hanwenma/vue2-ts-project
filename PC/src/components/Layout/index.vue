<template>
  <div class="layout">
    <Header :logoSrc="imgSrc" :linkObj="linkObj">
      <template v-slot:menu>
        <Menus :role="menusRole"></Menus>
      </template>
    </Header>

    <div :class="hideBreadcrumb ? 'view-content2' : 'view-content'">
      <Breadcrumb v-if="!hideBreadcrumb"></Breadcrumb>
      <div :class="hideBreadcrumb ? '' : 'main'">
        <router-view></router-view>
      </div>
    </div>

    <Footer :copyright="copyright" :desc="desc"></Footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Breadcrumb from '@/components/Breadcrumb';
import Header from '@/components/Header';
import MenuSingle from '@/components/MenuSingle';
import Menus from '@/components/Menus';
import Footer from '@/components/Footer';

@Component({
  components: {
    Header,
    Footer,
    Breadcrumb,
    MenuSingle,
    Menus,
  },
})
export default class ComponentLayout extends Vue {
  imgSrc: string = require('@/assets/images/logo/bg.jpeg');; // eslint-disable-line
  hideBreadcrumb: any = true;

  copyright: string = 'Copyright © 2020 - 2021 xxxx. All Rights Reserved.';
  desc: string = 'xxxx公司 版权所有';

  async mounted() {
    await this.initPage();
  }

  updated() {
    // 是否需要隐藏当前面包屑
    let meta: any = this.$route.meta;
    this.hideBreadcrumb = meta.hideBreadcrumb;
  }

  usrInfo: any = '';
  rolesInfo: any = '';
  menusRole: any[] = [];
  deptment: string = '';

  avatarSrc: string = require('@/assets/images/avatar.png');

  linkObj: any = {
    name: '未命名',
    link: this.avatarSrc,
    deptment: '未分配',
  };

  async initPage() {
    // 权限菜单
    // let userMenu = await getCurrentUserMenu();
    let userMenu:any = { code: 2000, data: [] };
    if (userMenu.code == 2000) {
      this.menusRole = userMenu.data;
    }

    // 用户信息
    // let res = await getUserInfo();
    let res:any = {};

    this.linkObj = {
      name: res.fullName ? res.fullName : '未命名',
      link: res.name ? `http://xxx.com/photo/150/${res.name}.png` : this.avatarSrc,
      deptment: res.deptName ? res.deptName : '未分配',
    };
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
