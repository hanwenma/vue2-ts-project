<template>
  <div :class="{ collapse: true, complex: isComplex, dashed: isDashed, 'error-bg': showErrorBg }">
    <!-- 针对缺陷审批 -->
    <div class="error-bg-text" v-if="showErrorBg">{{ $t('财务备注') }}：{{ errorBgText }}</div>

    <!-- 虚线折叠面板 -->
    <div v-if="isDashed" class="header unselect" @click="handleFold">
      <span>{{ title }}</span>
      <span class="icon-box">
        <i :class="unfold ? 'el-icon-arrow-right' : 'el-icon-arrow-down'"></i>
      </span>
      <span class="border"></span>
    </div>

    <!-- 复杂折叠面板 -->
    <div v-else :class="{ header: true,unselect: true, complex: isComplex, date: isDate, special: isSpecial, error: isError, boderDashed, margin: noMargin}" @click="handleFold">
      <div :class="{ left: true, complex: isComplex }" :style="{ width: leftPersent }">
        <span v-if="!isComplex && !isDate" :class="{ 'icon-box': true, fold: unfold }"> {{ unfold ? '-' : '+' }}</span>
        <i v-if="isDate" :class="unfold ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        <template v-if="reviewStatus === 1">
          <span class="title" :class="processingStatus !== -1 ? (processingStatus === 1 ? 'pass' : 'defect') : ''">{{
            title
          }}</span>
        </template>
        <template v-else-if="reviewStatus === 2">
          <span class="title pass">{{ title }}</span>
        </template>
        <template v-else>
          <span class="title">{{ title }}</span>
        </template>
        <template v-if="isAdjustment">
          <!-- <span v-if="state == 0" class="title pass">{{ $t('调账未进行提交') }}</span> -->
          <span v-if="state == 1 || state == 4" class="title pass">{{ $t('调账中') }}</span>
        </template>
        <span :class="isDate ? 'border' : 'small'">{{ smallTitle }}</span>
        <template v-if="reviewStatus === 1">
          <el-tooltip class="item" effect="light" :content="defectType" placement="top">
            <span class="defectType" :class="processingStatus !== -1 ? (processingStatus === 1 ? 'pass' : 'defect') : ''" style="display: block; height: 40px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ `${this.$t('DefectList.DeficiencyType')}: ` }}{{ defectType }}</span>
          </el-tooltip>
        </template>
      </div>
      <div :class="{ right: true, complex: isComplex }">
        <slot name="header-right"></slot>
        <span v-if="isComplex" :class="['icon-box', 'complex', isError ? 'red' : '']">
          <i :class="unfold ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </span>
      </div>
    </div>
    <!-- Header 中底部展示内容 -->
    <div v-if="needHeaderBto" :class="{'header-bto-content':true,unselect: true,complex: isComplex, special: isSpecial, error: isError,}" @click="handleFold">
      <slot name="header-bto-content"></slot>
    </div>

    <!-- 主体内容 -->
    <div :class="{ content: true, complex: isComplex }" v-show="unfold">
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
export default class Collapse extends Vue {
  unfold: boolean = true;

  @Prop({ required: false, default: true })
  customFold: any;

  @Prop({ type: String, required: false, default: '' })
  title!: string;

  @Prop({ required: false, default: '' })
  defectType!: any;

  @Prop({ type: String, required: false, default: '50%' })
  leftPersent;

  @Prop({ type: String, required: false, default: '' })
  smallTitle!: string;

  @Prop({ type: Boolean, required: false, default: false })
  isComplex;

  @Prop({ type: Boolean, required: false, default: false })
  isError;

  @Prop({ type: Boolean, required: false, default: false })
  isSpecial;

  @Prop({ type: Boolean, required: false, default: false })
  isDate;

  @Prop({ type: Boolean, required: false, default: false })
  isAdjustment;

  @Prop({ type: Number, required: false, default: 0 })
  state;

  @Prop({ type: Number, required: false, default: -1 })
  reviewStatus;

  @Prop({ type: Number, required: false, default: -1 })
  processingStatus;

  @Prop({ type: Boolean, required: false, default: false })
  isDashed;

  @Prop({ type: String, required: false, default: '' })
  errorBgText;

  @Prop({ type: Boolean, required: false, default: false })
  showErrorBg;

  @Prop({ type: Boolean, required: false, default: false })
  boderDashed;

  @Prop({ type: Boolean, required: false, default: false })
  buttonRight;

  @Prop({ type: Boolean, required: false, default: false })
  noMargin;

  @Prop({ type: Boolean, required: false, default: false })
  needHeaderBto;

  @Watch('customFold', { immediate: true })
  getCustomFold(newVal) {
    this.unfold = !!newVal;
  }

  handleFold() {
    this.unfold = !this.unfold;
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
