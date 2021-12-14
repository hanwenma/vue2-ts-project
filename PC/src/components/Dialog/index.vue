<template>
  <el-dialog custom-class="custom-dialog" :show-close="showClose" :width="width" :top="top" :destroy-on-close="destroyOnClose" :title="title" :visible.sync="visible" :close-on-click-modal="false" :modal="modal" @open="onOpen" @close="onClose" :append-to-body="body">
    <slot name="dialog-content"></slot>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="small-btn default" v-if="cancleBtn && !resetBtn" @click="visible = false">{{
        cancleText || $t('取消')
      }}</el-button>
      <el-button size="small" class="small-btn blue-outline" v-if="resetBtn" @click="onReset">{{
        resetText || $t('重置')
      }}</el-button>
      <el-button size="small" class="small-btn blue" :disabled="!canConfirm" v-if="confirmBtn" @click="handelConfirm">{{ confirmText || $t('确认') }}</el-button>
      <slot name="dialog-footer"></slot>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
@Component({
  components: {},
})
export default class Dialog extends Vue {
  visible: boolean = false;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  title;

  @Prop({
    type: String,
    required: false,
    default: '1000px',
  })
  width;

  @Prop({
    type: String,
    required: false,
    default: '15vh',
  })
  top;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  show;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  destroyOnClose;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  showClose;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  canConfirm;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  modal;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  cancleBtn;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  cancleText;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  resetBtn;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  resetText;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  confirmBtn;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  body;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  confirmText;

  @Prop({
    type: Function,
    required: false,
    default: function () {},
  })
  handelConfirm;

  @Watch('show')
  getVisible() {
    this.visible = this.show;
  }

  onClose() {
    this.$emit('handleClose');
  }

  onOpen() {
    this.$emit('handleOpen');
  }

  onReset() {
    this.$emit('handleReset');
  }

  mounted() {
    this.visible = this.show;
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
@import './reset.less';
</style>