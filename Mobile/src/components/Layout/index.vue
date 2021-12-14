<template>
  <div class="layout">
    <NavBar :config="navBarConfig"></NavBar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import NavBar from '@/components/NavBar';

@Component({
  components: {
    NavBar,
  },
})
export default class ComponentLayout extends Vue {
  navBarConfig: object = {
    title: this.$t('智能识票'),
  };
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
