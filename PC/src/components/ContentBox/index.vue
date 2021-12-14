<template>
  <div class="content-box">
    <div :class="{ 'header-icon': true,'unselect': true, dashed: isDashed, pointer: customFold !== undefined }" @click="handleFold">
      <div class="left">
        <i class="icon-i"></i>
        <span class="title">{{ title }}</span>
        <span :class="{ 'small-title': true, error: smallError }">{{ smallTitle }}</span>
      </div>
      <div class="right" :style="{ width: rightPersent }">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="contentBox-content" v-show="unfold">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ComponentContentBox extends Vue {
  unfold: boolean = true;

  @Prop({ type: Boolean, required: false, default: undefined })
  customFold;

  @Prop({
    type: String,
    required: true,
    default: '',
  })
  title;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  isDashed;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  smallTitle;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  smallError;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  rightPersent;

  @Watch('customFold', { immediate: true })
  getCustomFold(newVal) {
    if (newVal !== undefined) this.unfold = newVal;
  }

  handleFold() {
    if (this.customFold !== undefined) this.unfold = !this.unfold;
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
