<template>
  <div class="sticky-component-box">
    <slot></slot>

    <div :class="`sticky ${location}`" v-show="showStickyContent">
      <Breadcrumb v-if="breadcrumb" style="margin-bottom: 10px;" />
      <slot v-bind:uniqueName="uniqueName"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Breadcrumb from '@/components/Breadcrumb';

@Component({
  components: {
    Breadcrumb,
  },
})
export default class StickyContent extends Vue {
  showStickyContent: boolean = false;

  @Prop({
    type: String,
    required: false,
    default: 'top',
  })
  location;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  breadcrumb;

  get uniqueName() {
    return Date.now();
  }

  mounted() {
    window.addEventListener('scroll', this.scrollPage);
  }

  // 滚动页面监听
  scrollPage() {
    let scroll: any = document.documentElement.scrollTop || document.body.scrollTop;
    this.showStickyContent = scroll >= 130;
  }
}
</script>
<style lang="less">
@import './index.less';
</style>