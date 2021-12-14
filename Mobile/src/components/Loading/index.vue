<template>
  <Overlay :show="show" class="overlay">
    <Loading size="24px" color="#fff" vertical>{{ text }}</Loading>
  </Overlay>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Overlay, Loading } from 'vant';

@Component({
  components: {
    Overlay,
    Loading,
  },
})
export default class CustomLoading extends Vue {
  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  show;

  @Prop({
    type: String,
    required: false,
    default: '加载中...',
  })
  text;
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
