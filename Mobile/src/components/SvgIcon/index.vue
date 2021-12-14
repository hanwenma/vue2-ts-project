<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class ComponentSvgIcon extends Vue {
  @Prop({ default: '', required: true })
  svgName!: string

  @Prop({ default: '' })
  className!: string

  get iconName() {
    return `#icon-${this.svgName}`
  }
  get svgClass() {
    if (this.className) {
      return `svg-icon ${this.className}`
    } else {
      return 'svg-icon'
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
