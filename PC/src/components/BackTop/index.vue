<template>
  <div>
    <div class="scroll">
      <div class="top" @click="toTop"><i class="el-icon-caret-top"></i></div>
      <div class="bottom" @click="toBottom"><i class="el-icon-caret-bottom"></i></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ComponentLayout extends Vue {
  toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toBottom() {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  }
}
</script>
<style scoped lang="less">
@import './index.less';
</style>