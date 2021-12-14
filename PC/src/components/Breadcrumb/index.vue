<template>
  <div class="bc">
    <template v-for="(item, index) in routArr">
      <div class="name" :key="item.name">
        {{ $t(item.name) }}
      </div>
      <div class="tip" :key="index">{{ index == 0 ? ':' : '>' }}</div>
    </template>

    <div class="last-path">{{ $t(this.lastPath.name) }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ComponentBreadcrumb extends Vue {
  routArr = [] as object[];
  lastPath = {} as object;

  mounted() {
    this.initPage();
  }

  @Watch('$route')
  routechange(to: any, from: any) {
    this.initPage();
  }

  initPage() {
    this.routArr = [];
    this.$route.matched.forEach((routObj: any, index) => {
      console.log(routObj);
      if (index === 0) {
        routObj.name = this.$t('位置');
        routObj.path = '';
      }
      let rObj = {
        name: routObj.name,
        path: routObj.path,
      };
      this.routArr.push(rObj);
    });
    this.routArr = this.routArr.filter((item: any) => item.name);
    if (this.routArr.length > 1) {
      this.lastPath = this.routArr[this.routArr.length - 1];
    } else {
      this.lastPath = this.routArr[0];
    }
    this.routArr.pop();
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
