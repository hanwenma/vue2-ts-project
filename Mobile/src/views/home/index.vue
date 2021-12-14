<template>
  <div class="home">
      <h1>首页</h1>
      <SvgIcon svgName="calendar" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  isEmpty: boolean = true;
  dialogConfig: any = {
    show: false,
    message: '',
    svgName: 'warning',
  };

  handleUpload() {
    (this.$refs.upload as any).handlePopup();
  }

  resetDialogConfig() {
    this.dialogConfig.show = !this.dialogConfig.show;
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
