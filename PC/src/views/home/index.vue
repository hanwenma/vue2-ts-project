<template>
  <div class="home">
    <h1>首页</h1>
    <SvgIcon svgName="search" className="icon-search" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
