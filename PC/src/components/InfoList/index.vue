<template>
  <div class="TextList">
    <el-row :gutter="20" class="TextC" v-for="item in infoData" :key="item.key">
      <el-col :span="12">
        <div class="TextL">
          <span class="title">{{ item.label }}</span>{{ item.value }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ComponentInfoList extends Vue {
  @Prop({
    type: Array,
    required: false,
    default: () => [],
  })
  infoData!: {}[];
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
