<template>
  <div class="upload">
    <el-upload :ref="refName" :name="name" :before-upload="beforeUpload" :disabled="disabled" :auto-upload="false" :data="data" :action="apiHost + action" :on-remove="handleRemove" :on-change="onChange" :before-remove="beforeRemove" :limit="limit" :on-exceed="handleExceed" :file-list="fileLists" :http-request="httpRequest" :show-file-list="showFileList" :accept="accept" :on-progress="onProgress" :on-error="onError" :multiple="multiple" :class="{ disabled }">
      <slot></slot>
    </el-upload>
    <slot name="showFileList"></slot>
    <Dialog :width="dialogWidth" :showClose="false" :cancleBtn="false" :modal="modal" :show="showTips" :handelConfirm="handelConfirm" @handleClose="handelConfirm">
      <div slot="dialog-content" class="upload-tips">
        <i class="el-icon-warning icon"></i>
        <p class="text">{{ tipsText }}</p>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Dialog from '@/components/Dialog';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { post } from '@utils/request';
// 全局配置
const envConf = require('@build/webpack.base.conf.js'); // eslint-disable-line
const envConfVal = envConf[process.env.VUE_APP_API_ENV];

@Component({
  components: {
    Dialog,
  },
})
export default class ComponentsUpload extends Vue {
  showTips: boolean = false;
  tipsText: string = '';
  apiHost: string = envConfVal.apiHost;
  formData: any = new FormData();
  uploadFiles: Array<any> = [];
  fileTotal: number = 0;

  @Prop({
    type: Array,
    required: true,
    default: () => [],
  })
  fileList;

  @Prop({
    type: Array,
    required: false,
    default: () => [],
  })
  fileType;

  @Prop({
    type: String,
    required: false,
    default: '300px',
  })
  dialogWidth;

  @Prop({
    type: String,
    required: false,
    default: '*',
  })
  accept;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  showFileList;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  modal;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  multiple;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  disabled;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  needSuccessTip;

  @Prop({
    type: String,
    required: false,
    default: 'customUpload',
  })
  name;

  @Prop({
    type: String,
    required: false,
    default: 'files',
  })
  fileName;

  @Prop({
    type: String,
    required: false,
    default: 'customUpload',
  })
  refName;

  @Prop({
    type: String,
    required: true,
    default: '',
  })
  action;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  removeURL;

  @Prop({
    type: Number,
    required: false,
    default: 15,
  })
  limit;

  @Prop({
    type: Number,
    required: false,
    default: 10,
  })
  fileSize;

  @Prop({
    type: Object,
    required: false,
    default: null,
  })
  data;

  fileLists: any = [];
  @Watch('fileList', { deep: true, immediate: true })
  getCostList() {
    this.fileLists = this.fileList;
  }

  onProgress() {
    this.$emit('progress');
  }

  onSuccess(fileList) {}

  onError(response, files, fileList) {}

  async handleRemove(file, fileList) {
    if (this.removeURL === '') return false;
    if (this.removeURL !== '' && this.uploadFailed === false) {
      let data = {
        applyOrderAttachmentsInfoId: file.id,
        applyId: file.applyId,
      };
      const res: any = await post(this.removeURL, data, true);
      if (res.code == 2000) {
        this.fileLists.map((item, index) => {
          if (file.id === item.id) {
            this.fileLists.splice(index, 1);
          }
          this.$emit('handleRemove', file, this.fileLists);
        });
        this.$message({
          message: res.message,
          type: 'success',
        });
        // copy后的附件处理
        this.$EventBus.$emit('CopyDocumentProcessing', file);
      } else {
        this.$message({
          message: res.message,
          type: 'error',
        });
      }
    }
  }

  handleExceed(files, fileList) {
    this.$message({
      type: 'warning',
      message: `Currently limited to ${this.limit} files, ${files.length} files are selected this time`,
    });
  }

  beforeRemove(file, fileList) {}

  size: boolean = true;
  beforeUpload(file, fileList) {
    let flag = file.size / 1024 / 1024 < this.fileSize;
    if (this.fileType.length > 0) {
      let fileTypeList = !this.fileType.includes(file.type);
      if (!fileTypeList) {
        this.size = false;
        this.tipsText = `上传头像图片只能是${this.fileType}格式`;
        this.showTips = true;
        this.uploadFiles = [];
      }
    }

    if (!flag) {
      this.size = false;
      this.tipsText = `Upload file cannot be larger than ${this.fileSize} M`;
      this.showTips = true;
      this.uploadFiles = [];
    }

    if (this.size) {
      return flag;
    } else {
      this.uploadFiles = [];
      return false;
    }
  }

  handleReset() {
    this.formData = new FormData();
    this.uploadFiles = [];
    this.fileTotal = 0;
    this.$emit('finish');
  }
  uploadFailed: boolean = false;
  async httpRequest(fileObj: any) {
    if (this.size) {
      this.formData.append(this.fileName, fileObj.file);
      if (this.formData.getAll(this.fileName).length !== this.fileTotal) return;
      // 判断当前选中的文件类型是不是设置的类型
      let isRightType = true;
      this.formData.getAll(this.fileName).forEach((file) => {
        // alert(file.type);
        if (this.accept !== '*' && isRightType) {
          isRightType = this.accept.indexOf(file.type) !== -1;
          return;
        }
      });
      if (!isRightType) {
        // 重置
        this.handleReset();
        this.$message({ type: 'warning', message: `Please select a file of type ${this.accept}` });
        return;
      }
      // 额外参数
      if (this.data) {
        Object.keys(this.data).forEach((key) => {
          if (key !== 'costCenterCodes') {
            this.formData.append(key, this.data[key]);
          }
          console.log(this.formData.getAll(key));
        });
        if (Array.isArray(this.data.costCenterCodes)) {
          this.data.costCenterCodes.forEach((item, i) => {
            this.formData.append(`costCenterCodes[${i}].costCenterCode`, item.costCenterCode);
            this.formData.append(`costCenterCodes[${i}].deptCode`, item.deptCode);
          });
        }
      }
      const res: any = await post(this.action, this.formData, true);
      if (res.code == 2000) {
        this.$emit('success', res);

        this.needSuccessTip &&
          this.$message({
            message: res.message,
            type: 'success',
          });

        this.uploadFailed = false;
        // 成功之后  清空已选择的数据  防止下次onchange事件不会触发
        (this.$refs[this.refName] as any).clearFiles();
      } else {
        this.uploadFailed = true;
        (this.$refs[this.refName] as any).handleRemove(this.uploadFiles);
        this.tipsText = res.message;
        this.showTips = true;
      }
      // 重置
      this.handleReset();
    }
  }

  onChange(file, fileList) {
    this.size = true;
    file.status == 'ready' && this.uploadFiles.push(file.raw);
    let files: any = (<HTMLInputElement>document.getElementsByName(this.name)[0]).files;
    this.fileTotal = files.length;
    this.formData = new FormData();
    if (this.uploadFiles.length === this.fileTotal) {
      (this.$refs[this.refName] as any).submit();
    }
  }

  handelConfirm() {
    this.showTips = false;
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
