<template>
  <div class="footer">
    <p>
      {{copyright}}
      <br />
      {{desc}}
    </p>
  </div>
  
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ComponentFooter extends Vue {
  
  @Prop({ type: String, required: false, default: '' })
  copyright!: string; // 第一行 版权说明 

  @Prop({ type: String, required: false, default: '' })
  desc!: string; // 第二行 版权说明 

}
</script>

<style scoped lang="less">
@import './index.less';
</style>
