<template>
  <div :class="isShow ? 'slideFolder custom-scroll show' : 'slideFolder custom-scroll'">
    <div class="drawer-btn" @click="handleDrawer" :style="{ 'border-radius': radius }">
      <i v-if="topIconClass" :class="{ camera: true, topIconClass }"></i>
      <p class="text">{{ title }}</p>
      <p class="icon-arrow-box">
        <i :class="isShow ? 'el-icon-arrow-right arrow' : 'el-icon-arrow-left arrow'"></i>
      </p>
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component({})
export default class SlideFolder extends Vue {
  @Prop({
    type: String,
    required: false,
    default: '',
  })
  title;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  topIconClass;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  isShow;

  @Prop({
    type: String,
    required: false,
    default: '5px 0 0 5px',
  })
  radius;

  handleDrawer() {
    this.$emit('drawerAction', this.isShow);
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
