<template>
  <div :class="['footer', isEn ? 'en' :'']">
    <div>
      <slot></slot>
    </div>
    <div class="bot">
      <span v-if="isEn">Provide technical support by</span>
      <span v-if="!isEn">由</span>
      <img src="@/assets/images/txyt.png" style="margin:0 5px" alt="腾讯优图" />
      <span v-if="!isEn">提供技术支持</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Footer extends Vue {
  get isEn() {
    return this.$store.state.locale !== 'zh';
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
