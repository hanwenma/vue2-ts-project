<template>
  <ul class="head-menu" :active="activeIndex">
    <!-- 路由 菜单 -->
    <template v-for="menu in roleMenu">
      <!-- 父级 菜单 -->
      <li :key="menu.path" :name="menu.path" @click.stop="changeHandler(menu.path)" :class="activeIndex == menu.path ? 'menu-item item-active' : 'menu-item'">
        <span :class="activeIndex == menu.path ? 'item-active' : ''" :title="menu.name"> {{ menu.name }}</span>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { getRoutObj } from '@utils/tools';

@Component({
  components: {},
})
export default class ComponentMenuSingle extends Vue {
  routeArr = [] as any[];
  activeIndex = '' as string;

  mounted() {
    this.initPage();
  }

  initPage() {
    this.routeHandle(); // 设置菜单
  }

  roleMenu = [] as any; // 权限菜单
  // 路由处理
  routeHandle() {
    let routeObj = this.$router as any;

    // 获取 路由数组
    let routeArr = routeObj.options.routes[0] as any;

    let cRouteObj = routeArr === undefined ? [] : routeArr;
    this.roleMenu = getRoutObj(cRouteObj).children;

    // 设置 当前路由
    let routArr = this.$route.path.split('/');
    this.activeIndex = '/' + routArr[1];
  }

  @Watch('$route')
  updateActiveMenu() {
    let matchResult = this.$route.path.match(/\/.+\//g);
    if (matchResult) {
      this.activeIndex = matchResult[0].slice(0, -1);
    }
  }

  changeHandler(path) {
    if (this.activeIndex != path) {
      this.$router.push({
        path: path,
      }); // 跳转页面
      this.activeIndex = path; // 设置选中菜单
    }
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
