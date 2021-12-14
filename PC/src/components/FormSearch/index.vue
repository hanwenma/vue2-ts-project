<template>
  <div class="form-search">
    <el-form :inline="inline" ref="form" size="small" label-width="100" :model="formModel" class="custom-form-box" @keyup.enter.native="handleSubmit">
      <!-- 表单元素 -->
      <template v-for="item in normalFormItem">
        <el-form-item :class="[
          'form-item-custom',
          'custom-flex',
          item.type == 'multipleCheckbox' ? 'form-item-multiple' : '',
          (item.checkboxs || []).length <= 1 ? 'small-item-multiple' : '',
        ]" :label="item.label" :key="Array.isArray(item.key) ? item.key[0] : item.key" v-if="!item.isHide">
          <span v-if="item.type !== 'multipleCheckbox'">：</span>
          <template v-if="item.type == 'input' || !typeArr.includes(item.type)">
            <el-input step="-" v-model="formModel[item.key]" :placeholder="item.placeholder"></el-input>
          </template>

          <template v-else-if="item.type == 'amountRange'">
            <div class="amount-range">
              <el-input type="text" v-model="formModel[item.key].min" @input="formatAmount(formModel[item.key], 'min')" :placeholder="item.placeholder"></el-input>
              <span>{{ $t('至') }}</span>
              <el-input type="text" v-model="formModel[item.key].max" @input="formatAmount(formModel[item.key], 'max')" :placeholder="item.placeholder"></el-input>
            </div>
          </template>

          <template v-else-if="item.type == 'multipleCheckbox'">
            <el-checkbox v-for="(checkbox, index) in item.checkboxs" :key="index" size="medium" v-model="formModel[checkbox.key]">{{ checkbox.name }}</el-checkbox>
          </template>

          <div class="select-box" v-else-if="item.type == 'asyncSelect' || item.type == 'select'">
            <el-select :default-first-option="true" :reserve-keyword="false" :disabled="item.disabled" :popper-class="item.multiple ? 'w-200 async-multiple-select-dropdown':'w-200'" :class="{ 'async-select': item.type == 'asyncSelect','fill-in': item.type == 'asyncSelect' && (formModel[item.key] || []).length }" filterable clearable :remote="item.type == 'asyncSelect'" v-model="formModel[item.key]" :multiple="item.multiple" :remote-method="item.remoteMethod ? item.remoteMethod.bind(null, item.key) : null" :loading="item.loading" :placeholder="item.placeholder || ''">
              <el-option v-for="optionItem in item.options" :label="optionItem.label" :value="item.type == 'asyncSelect' && item.multiple ? optionItem : optionItem.value" :key="optionItem.value" :title="optionItem.label"></el-option>
            </el-select>
            <SvgIcon v-show="item.type == 'asyncSelect' && (!formModel[item.key] || !formModel[item.key].length)" svgName="search" :className="item.disabled ? 'icon-search disabled' : 'icon-search'" />
          </div>

          <div class="double-select" v-else-if="item.type == 'doubleSelect'">
            <el-select :default-first-option="true" :reserve-keyword="false" :popper-class="item.multiple ? 'w-100 async-multiple-select-dropdown':'w-100'" class="select-item" filterable clearable :key="item.key[0]" v-model="formModel[item.key[0]]" :multiple="item.multiple" :loading="item.loading" :placeholder="item.placeholder || ''">
              <el-option v-for="optionItem in item.options1" :label="optionItem.label" :value="optionItem.value" :key="optionItem.value" :title="optionItem.label"></el-option>
            </el-select>

            <el-select :default-first-option="true" :reserve-keyword="false" :popper-class="item.multiple ? 'w-200 async-multiple-select-dropdown':'w-200'" class="select-item" filterable clearable :key="item.key[1]" v-model="formModel[item.key[1]]" :multiple="item.multiple" :loading="item.loading" :placeholder="item.placeholder || ''">
              <el-option v-for="optionItem in item.options2" :label="optionItem.label" :value="optionItem.value" :key="optionItem.value" :title="optionItem.label"></el-option>
            </el-select>
          </div>

          <template v-else-if="item.type == 'datetimerange'">
            <el-date-picker v-model="formModel[item.key]" type="datetimerange" range-separator="~" :start-placeholder="$t('开始时间')" :end-placeholder="$t('结束时间')" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm">
            </el-date-picker>
          </template>

          <template v-else-if="item.type == 'daterange' || item.type == 'monthrange'">
            <el-date-picker :value-format="item.type == 'monthrange' ? 'yyyy-MM' : 'yyyy-MM-dd'" v-model="formModel[item.key]" :type="item.type" range-separator="~" :start-placeholder="item.startPlaceholder || item.type == 'monthrange' ? $t('开始月份') : $t('开始时间')" :end-placeholder="item.endPlaceholder || item.type == 'monthrange' ? $t('结束月份') : $t('结束时间')">
            </el-date-picker>
          </template>

          <template v-else-if="item.type == 'cascader'">
            <el-cascader ref="cascader" clearable :options="item.options" :props="item.optionProps" v-model="formModel[item.key]" @change="cascaderChange()" popper-class="select-cascader">
            </el-cascader>
          </template>

          <template v-else-if="item.type == 'selectGroup'">
            <el-select :default-first-option="true" :reserve-keyword="false" style="width: 205px" :multiple="item.multiple" filterable clearable v-model="formModel[item.key]" :placeholder="$t('请选择')" size="small">
              <el-option-group v-for="group in item.options" :key="group.label" :label="group.label">
                <el-option v-for="sub in group.options" :key="sub.value" :label="sub.value" :value="sub">
                </el-option>
              </el-option-group>
            </el-select>
          </template>

        </el-form-item>
      </template>
      <!-- 折叠部分 -->
      <template v-if="collapseFormItem.length">
        <div class="collapse unselect" @click="handleCollapse">
          <span>{{ $t('收起/展开多余搜索条件') }}</span>
          <span class="icon-box"><i :class="unfold ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></span>
          <span class="dashed"></span>
        </div>

        <template v-if="unfold">
          <el-form-item :class="['form-item-custom', 'custom-flex', item.type == 'multipleCheckbox' ? 'form-item-multiple' : '']" :label="item.label" v-for="item in collapseFormItem" :key="Array.isArray(item.key) ? item.key[0] : item.key">
            <span v-if="item.type !== 'multipleCheckbox'">：</span>
            <template v-if="item.type == 'input' || !typeArr.includes(item.type)">
              <el-input step="-" v-model="formModel[item.key]" :placeholder="item.placeholder"></el-input>
            </template>

            <template v-else-if="item.type == 'amountRange'">
              <div class="amount-range">
                <el-input type="text" v-model="formModel[item.key].min" @change="formatAmount(formModel[item.key], 'min')" :placeholder="item.placeholder"></el-input>
                <span>{{ $t('至') }}</span>
                <el-input type="text" v-model="formModel[item.key].max" @change="formatAmount(formModel[item.key], 'max')" :placeholder="item.placeholder"></el-input>
              </div>
            </template>

            <template v-else-if="item.type == 'multipleCheckbox'">
              <el-checkbox v-for="(checkbox, index) in item.checkboxs" :key="index" size="medium" v-model="formModel[checkbox.key]">{{ checkbox.name }}</el-checkbox>
            </template>

            <div class="select-box" v-else-if="item.type == 'asyncSelect' || item.type == 'select'">
              <el-select :default-first-option="true" :reserve-keyword="false" :popper-class="item.multiple ? 'w-200 async-multiple-select-dropdown':'w-200'" :class="{ 'async-select': item.type == 'asyncSelect','fill-in': item.type == 'asyncSelect' && (formModel[item.key] || []).length }" filterable clearable :remote="item.type == 'asyncSelect'" v-model="formModel[item.key]" :multiple="item.multiple" :remote-method="item.remoteMethod ? item.remoteMethod.bind(null, item.key) : null" :loading="item.loading" :placeholder="item.placeholder || ''">
                <el-option v-for="optionItem in item.options" :label="optionItem.label" :value="item.type == 'asyncSelect' && item.multiple ? optionItem : optionItem.value" :key="optionItem.value" :title="optionItem.label"></el-option>
              </el-select>
              <SvgIcon v-show="item.type == 'asyncSelect' && (!formModel[item.key] || !formModel[item.key].length)" svgName="search" :className="item.disabled ? 'icon-search disabled' : 'icon-search'" />
            </div>

            <div class="double-select" v-else-if="item.type == 'doubleSelect'">
              <el-select :default-first-option="true" :reserve-keyword="false" :popper-class="item.multiple ? 'w-100 async-multiple-select-dropdown':'w-100'" class="select-item" filterable clearable :key="item.key[0]" v-model="formModel[item.key[0]]" :multiple="item.multiple" :loading="item.loading" :placeholder="item.placeholder || ''">
                <el-option v-for="optionItem in item.options1" :label="optionItem.label" :value="optionItem.value" :key="optionItem.value" :title="optionItem.label"></el-option>
              </el-select>

              <el-select :default-first-option="true" :reserve-keyword="false" :popper-class="item.multiple ? 'w-200 async-multiple-select-dropdown':'w-200'" class="select-item" filterable clearable :key="item.key[1]" v-model="formModel[item.key[1]]" :multiple="item.multiple" :loading="item.loading" :placeholder="item.placeholder || ''">
                <el-option v-for="optionItem in item.options2" :label="optionItem.label" :value="optionItem.value" :key="optionItem.value" :title="optionItem.label"></el-option>
              </el-select>
            </div>

            <template v-else-if="item.type == 'daterange' || item.type == 'monthrange'">
              <el-date-picker :value-format="item.type == 'monthrange' ? 'yyyy-MM' : 'yyyy-MM-dd'" v-model="formModel[item.key]" :type="item.type" range-separator="~" :start-placeholder="
                  item.startPlaceholder || item.type == 'monthrange' ? $t('开始月份') : $t('开始时间')
                " :end-placeholder="item.endPlaceholder || item.type == 'monthrange' ? $t('结束月份') : $t('结束时间')">
              </el-date-picker>
            </template>

            <template v-else-if="item.type == 'datetimerange'">
              <el-date-picker v-model="formModel[item.key]" type="datetimerange" range-separator="~" :start-placeholder="$t('开始时间')" :end-placeholder="$t('结束时间')" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </template>
          </el-form-item>
        </template>
      </template>

      <!-- 查询按钮 -->
      <template v-if="formInnerBtns">
        <el-form-item v-if="!reset" class="form-item-custom form-item-custom-button">
          <div class="query-btn-box">
            <slot name="custom-query-operate"></slot>
            <el-button type="default" size="small" :disabled="loading" @click="handleSubmit" class="small-btn blue">{{
              loading ? $t('查询...') : $t('查询')
            }}</el-button>
          </div>
        </el-form-item>
        <el-form-item v-else class="form-item-custom form-item-custom-button">
          <div class="query-btn-box">
            <slot name="custom-query-operate"></slot>
            <el-button type="default" size="small" :disabled="loading" @click="resetForm" class="small-btn blue-outline">
              {{ $t('重置') }}
            </el-button>
            <el-button type="default" size="small" :disabled="loading" @click="handleSubmit" class="small-btn blue">{{
              loading ? $t('查询...') : $t('查询')
            }}</el-button>
          </div>
        </el-form-item>
      </template>

      <template v-else>
        <el-form-item v-if="!reset" class="form-item-custom form-item-custom-button">
          <div class="query-btn-box">
            <slot name="custom-query-operate"></slot>
            <el-button type="default" size="small" :disabled="loading" @click="handleSubmit" class="small-btn blue">{{
              loading ? $t('查询...') : $t('查询')
            }}</el-button>
          </div>
        </el-form-item>
        <el-form-item v-else class="form-reset-btn">
          <el-button type="default" size="small" :disabled="loading" @click="resetForm" class="small-btn blue-outline">
            {{ $t('重置') }}
          </el-button>
          <el-button type="default" size="small" :disabled="loading" @click="handleSubmit" class="small-btn blue">{{
            loading ? $t('查询...') : $t('查询')
          }}</el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class FormSearch extends Vue {
  typeArr: Array<string> = [
    'input',
    'amountRange',
    'select',
    'doubleSelect',
    'asyncSelect',
    'multipleCheckbox',
    'daterange',
    'monthrange',
    'datetimerange',
    'cascader',
    'selectGroup',
  ];
  normalFormItem: Array<any> = []; // 正常表单元素
  collapseFormItem: Array<any> = []; // 折叠表单元素
  unfold: boolean = true;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  inline;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  reset;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  formInnerBtns;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  loading;

  @Prop({
    type: Object,
    required: false,
    default: {},
  })
  formModel;

  @Prop({
    type: Array,
    required: false,
    default: () => [],
  })
  formType;

  @Prop({
    type: Function,
    required: false,
    default: () => {},
  })
  onSubmit;

  @Prop({ required: true })
  tableRef;

  handleSubmit() {
    this.onSubmit({ pageIndex: 1, pageSize: this.tableRef.pageSize });
    this.tableRef.handleCurrentChange(1, true);
  }

  filterFormType() {
    this.formType.forEach((item) => {
      if (item.collapse) {
        this.collapseFormItem.push(item);
      } else {
        this.normalFormItem.push(item);
      }
    });
  }

  resetFormItem(formModel: any, keys: Array<any>) {
    if (!keys.length) return;
    const multipleCheckKeyArr: any[] = [
      'isExemptDocuments',
      'allElectronicFile',
      'isAllElectronicFile',
      'isDefectiveDocuments',
    ];
    keys.forEach((key) => {
      let type = Object.prototype.toString.call(formModel[key]);
      if (type === '[object Object]') {
        this.resetFormItem(formModel[key], Object.keys(formModel[key]));
      } else if (type === '[object Array]') {
        formModel[key] = [];
      } else if (multipleCheckKeyArr.includes(key)) {
        formModel[key] = false;
      } else {
        formModel[key] = undefined;
      }
    });
  }

  formatAmount(originObj, key) {
    originObj[key] = Number(originObj[key]).toFixed(2);
  }

  resetForm() {
    this.resetFormItem(this.formModel, Object.keys(this.formModel));
  }

  handleCollapse() {
    let keys = this.collapseFormItem.map((item) => item.key);
    this.unfold = !this.unfold;
    this.resetFormItem(this.formModel, keys);
  }

  cascaderChange() {
    (this.$refs.cascader as any)[0].dropDownVisible = false;
  }

  mounted() {
    this.filterFormType();
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
<style lang="less">
@import './reset.less';
</style>
