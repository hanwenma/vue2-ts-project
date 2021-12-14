<template>
  <div class="InfoTitle">
    <div :class="{'header-icon':true,[`font-${fontSize}`]:fontSize}">
      {{ title }}
    </div>
    <div>
      <el-row>
        <el-col style="margin: 5px 0; width: 50%" v-for="item in inforData" :key="item.key">
          <el-col class="TextR" :span="12">{{ item.labt }}</el-col>
          <el-col class="TextL" :span="12">{{ item.value }}</el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
@Component({
  components: {},
})
export default class ComponentInfoTitle extends Vue {
  @Prop({ type: String, required: false, default: '' })
  title!: string;

  @Prop({ required: false })
  inforData!: any;

  @Prop({ required: false })
  fontSize!: string;
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
