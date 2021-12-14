<template>
  <div class="two-columns">
    <div class="top" v-if="data.normal">
      <div class="tip-box" v-if="tips.length">
        <div class="tip" v-for="(tip,index) in tips" :key="index">
          <i class="el-icon-warning-outline"></i>
          <span>{{tip}}</span>
        </div>
      </div>
      <el-row class="my-row">
        <el-col :span="data.colNumber ? 24 / data.colNumber : 12" v-for="(item, index) in data.normal" :key="index">
          <div :class="{ 'list-item': true, error: item.error }" style="min-height:30px" v-if="item.isOver === undefined || item.isOver">
            <label class="label" :style="{ 'max-width': data.colNumber > 2 ? labelWidth : '135px' }">
              <i class="el-icon-warning-outline reason-icon" v-if="item.reason"></i> {{ item.label }}
            </label>
            <span v-if="item.label">:</span>
            <template>
              <!-- 文本 -->
              <span class="text" v-if="['text', undefined].includes(item.type)">
                <span :class="{ 'has-reason': item.reason }">{{ item.value }}</span>
                <div class="reason-box" v-if="item.reason">
                  <span class="reason">{{ item.reason }}</span>
                </div>
              </span>
              <!-- 链接 -->
              <a v-else-if="item.type === 'link'" class="text height-light" :href="item.linkUrl" :target="item.target">
                {{ item.value }}
              </a>
              <!-- 类型为 list -->
              <div :class="['custom-scroll', 'mini', 'text', 'list', item.relKey ? '': 'overflow' ]" v-else>
                <!-- 多行文本-补充说明 -->
                <template v-if="item.relKey">
                  <p v-for="(listItem, listIndex) in item.value" :key="listIndex">
                    {{ listItem[item.relKey] }}
                  </p>
                </template>
                <!-- 附件列表 -->
                <template v-else>
                  <p v-for="(file, fileIndex) in item.value" :key="fileIndex">
                    <a class="height-light" :href="file.fileUrl || file.gasPath || 'javascript：void(0);'" :download="file.fileName">{{ file.fileName || '' }}</a>
                  </p>
                </template>
              </div>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="middle" v-if="data.isError && data.error">
      <el-row :class="`audit-opinion ${auditClass}`">
        <div class="list-item">
          <label class="label">
            {{ $t('意见') }}
          </label>
          <span>:</span>
        </div>
      </el-row>
      <el-row class="my-row">
        <el-col :span="data.colNumber ? 24 / data.colNumber : 12" v-for="(item, index) in data.error" :key="index">
          <div class="list-item" style="min-height:30px">
            <label class="label error" :style="{ 'max-width': data.colNumber > 2 ? labelWidth : '130px' }">
              {{ item.label }}
            </label>
            <span v-if="item.label" class="error">:</span>
            <!-- 文本 -->
            <span class="text error">
              {{ item.value }}
            </span>
          </div>
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
export default class TwoColumns extends Vue {
  @Prop({
    type: String,
    required: false,
    default: '',
  })
  auditClass;

  @Prop({
    type: String,
    required: false,
    default: '119px',
  })
  labelWidth;

  @Prop({
    type: Object,
    required: false,
    default: function () {
      return { colNumber: 2, normal: [], error: [], isError: false };
    },
  })
  data;

  @Prop({
    type: Array,
    required: false,
    default: () => [],
  })
  tips;
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
