<template>
  <div class="custom-el-tabs">
    <el-tabs>
      <el-tab-pane v-for="item in tabPanes" :key="item.label" style="margin-right:10px">
        <span slot="label">{{ item.label }}</span>
        <slot :name="item.name"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ComponentsTabs extends Vue {
  @Prop({
    type: Array,
    required: false,
    default: () => [],
  })
  tabPanes;
}
</script>

<style lang="less">
@import './index.less';
</style>
