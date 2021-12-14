<template>
  <div class="head-menus-bg">
    <div class="head-menus">
      <el-menu :default-active="activeIndex" mode="horizontal" class="menus" background-color="#246BDD" text-color="#fff" active-text-color="#fff" @select="handleSelect" :router="true">
        <el-menu-item v-show="routesArrNoChild.length > 0" v-for="childMenus in routesArrNoChild" :index="childMenus.path" :key="`${childMenus.path}-${childMenus.name}`">{{ $t(childMenus.name) }}</el-menu-item>

        <!-- 权限 菜单 -->
        <template v-if="routesObjArr.length > 0">
          <template v-for="menus in routesObjArr">
            <el-submenu :index="menus.path" :key="`${menus.path}-${menus.name}`">
              <template slot="title">
                <span class="title-text" @click="handleMenus(menus.path)">{{ $t(menus.name) }}</span>
              </template>
              <el-menu-item v-for="item in menus.children" :index="`${item.path}`" :key="`${item.path}-${item.name}`">{{
                $t(item.name)
              }}</el-menu-item>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Menu, Submenu, MenuItem } from 'element-ui';

const isDevelopment = process.env.NODE_ENV == 'development';

declare interface IMenusRtn {
  menuKey: string; // 菜单 URL
  menuValue: string; // 菜单名称
  sort: number; // 排序号
  childMenu?: []; // 子菜单列表
}

@Component({
  components: {
    'el-menu': Menu,
    'el-submenu': Submenu,
    'el-menu-item': MenuItem,
  },
})
export default class HeadMenusComponent extends Vue {
  activeIndex = '' as string;
  NavData = [] as Array<string>;

  handleSelect(key: string, keyPath: string) {
    console.log('handleSelect >>>>>>>>>: ', key, keyPath);
  }

  handleMenus(path) {
    if ((path === '/' || path === '/home') && this.$route.path !== '/home') {
      this.$router.push({ path: '/' });
    }
  }

  @Watch('$route')
  routechange(to: any, from: any) {
    this.routeActiveHandler(); // 路由改变时，修改active
  }

  routesObjArr = [] as any;

  routesArrNoChild = [] as any;

  @Prop() role!: any[];

  @Watch('role', { deep: true })
  onChangeRole(val: any, old: any) {
    this.role = val;
    this.routeHandleByEnv();
  }

  async mounted() {
    this.routeHandleByEnv();
  }

  // 根据环境执行路由处理
  routeHandleByEnv() {
    if (isDevelopment) {
      this.routeLocationHandle();
    } else {
      this.routeHandle();
    }
  }

  isShowMenus = [] as any;
  // 权限 路由 处理
  routeHandle() {
    // 权限数组
    this.routesObjArr = [];
    this.routesArrNoChild = [];

    // 路由数组
    let routeCarr = this.role.length == 0 ? [] : this.role;

    [...routeCarr].map((item: any) => {
      if (item.children === undefined) {
        let obj = {
          path: item.url,
          name: item.name,
          visible: true,
        };
        this.routesArrNoChild.push(obj);
      } else {
        let obj = {
          path: item.url,
          name: item.name,
          children: [],
        } as any;
        item.children.map((ele: any) => {
          let eleObj = {
            path: ele.url,
            name: ele.name,
            visible: true,
          } as any;
          obj.children.push(eleObj);
        });

        this.routesObjArr.push(obj);
      }
    });

    // 设置选中效果
    this.routeActiveHandler();
  }
  // 本地 路由 处理
  routeLocationHandle() {
    // 权限数组
    this.routesObjArr = [];
    this.routesArrNoChild = [];

    // 路由数组
    let routeObj = this.$router as any;
    let routeArray = routeObj.options.routes[0] as any;
    let routeCarr = routeArray.children === undefined ? [] : routeArray.children;

    [...routeCarr]
      .filter((item) => item.path !== '/pastdefectList')
      .map((item: any) => {

        if (item.children === undefined) {
          let obj = {
            path: item.path,
            name: item.name,
            visible: true,
          };
          this.routesArrNoChild.push(obj);
        } else {
          let obj = {
            path: item.path,
            name: item.name,
            children: [],
          } as any;
          item.children.map((ele: any) => {
            let eleObj = {
              path: ele.path,
              name: ele.name,
              visible: true,
            } as any;
            obj.children.push(eleObj);
          });
          this.routesObjArr.push(obj);
        }
      });

    // 设置选中效果
    this.routeActiveHandler();
  }

  public routeActiveHandler() {
    const hashPath = window.location.hash.split('/');
    let currActiveIndex = `/${hashPath[1]}`;
    if (hashPath[2]) {
      currActiveIndex = `${currActiveIndex}/${hashPath[2]}`; // 二级菜单
    }
    this.activeIndex = currActiveIndex;
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
