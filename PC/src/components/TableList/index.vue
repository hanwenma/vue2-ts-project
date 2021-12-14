<template>
  <div class="table-box">
    <!-- 自定义显示列 -->
    <div class="custom-columns-btn" v-if="customColumns">
      <el-button class="small-btn blue-outline" size="small" type="default" @click="handleResetColumns">
        {{ $t('重置') }}</el-button>
      <el-button class="small-btn blue" size="small" type="primary" @click="showColumns = true">
        {{ $t('设置显示列') }}</el-button>
    </div>
    <!-- 表格 -->
    <div class="t-table" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.2)" element-loading-text="正在加载...">
      <!-- 表格列表 -->
      <div class="table-list">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%" header-row-class-name="table-header" :cell-class-name="rowClass" :header-cell-class-name="headerClass" border :row-key="getRowKeys" @sort-change="sortChange" @row-click="rowClick" :span-method="spanMethod">
          <el-table-column v-if="selection" :selectable="getSelectable" :reserve-selection="false" type="selection" width="50"></el-table-column>
          <el-table-column :fixed="item.fixed" :label="item.label" :width="item.width" v-for="item in columnData" :key="item.label" :sortable="!!item.sortable" :prop="item.key" :class-name="item.className">
            <template slot-scope="scope">
              <slot v-if="item.custom" :name="item.slotName || item.key" :row="scope.row" :index="scope.$index"></slot>
              <div v-else-if="item.operate" style="display:flex;">
                <slot name="operate" :row="scope.row" :index="scope.$index"></slot>
              </div>
              <div v-else-if="item.wrap">
                <p :title="scope.row[item.key]">{{ typeof scope.row[item.key] === 'number' ? scope.row[item.key] : scope.row[item.key] || '-' }}</p>
              </div>
              <p v-else :title="scope.row[item.key]" class="text-ellipsis">{{ typeof scope.row[item.key] === 'number' ? scope.row[item.key] : scope.row[item.key] || '-' }}</p>
            </template>
          </el-table-column>
          <template slot="empty">
            <span v-if="!actionText">{{ $t('暂无数据') }}</span>
            <div v-else>
              <p>
                {{ $t('暂无数据') }}(
                <span style="color: #67D36F; cursor: pointer" @click="$emit('handleAction')">{{ actionText }}</span> )
              </p>
            </div>
          </template>
        </el-table>
      </div>

      <!-- 分页信息 -->
      <template v-if="showPagination">
        <div class="t-pagination">
          <div class="page-info">
            {{isEN ? `A total of ${(total || 0)} records Page ${currentPage} of ${pageCount}` : `共 ${(total || 0)} 条记录 第 ${currentPage} / ${pageCount} 页`}}
          </div>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout=" prev, pager, next, sizes, jumper" :total="total"></el-pagination>
        </div>
      </template>
    </div>

    <!-- 弹窗 -->
    <Dialog :destroyOnClose="false" :title="$t('自定义列')" :body="true" :show="showColumns" :resetBtn="true" @handleReset="handleResetColumns" @handleClose="handleColumnsClose" :handelConfirm="handleSetColumns" width="800px">
      <div slot="dialog-content" class="column-checkbox-group-box">
        <el-checkbox-group v-model="selectColumns" class="column-checkbox-group">
          <el-checkbox v-for="column in columnKeys" :label="column.key" :key="column.key" :title="column.label">{{
            column.label
          }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Dialog from '@/components/Dialog';
import moment from 'moment';
import * as Cookies from 'js-cookie';

@Component({
  components: {
    Dialog,
  },
})
export default class TableList extends Vue {
  currentPage: number = 1;
  pageSizes: Array<number> = [10, 20, 50, 100];
  pageSize: number = 10;
  // 自定义列
  showColumns: boolean = false;
  columnDataCopy: any = [];
  columnKeys: Array<any> = []; // 弹窗上展示的 key
  selectColumns: Array<any> = []; // 展示列的 key

  get pageCount() {
    return Math.ceil(this.total / this.pageSize) || 1;
  }

  get isEN() {
    const nowLg: string = Cookies.get('language') || 'en-EN';
    return nowLg === 'en-EN';
  }

  @Prop({
    type: Array,
    required: false,
    default: () => [],
  })
  tableData;

  @Prop({
    type: Function,
    required: false,
    default: () => {},
  })
  spanMethod;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  loading;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  selection;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  customColumns;

  @Prop({
    type: Array,
    required: false,
    default: () => [],
  })
  columnData;

  // @Prop({
  //   type: Function,
  //   required: false,
  //   default: () => {},
  // })
  // sizeChange;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  actionText;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  rowKey;

  @Prop({
    type: Function,
    required: false,
    default: () => {},
  })
  pageChange;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  border;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  showPagination;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  padding;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  addStar;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  total;

  @Prop({
    type: Number,
    required: false,
    default: 80,
  })
  height;

  @Prop({
    type: Function,
    required: false,
    default: () => {},
  })
  handleSelectionChange;

  @Prop({
    type: Function,
    required: false,
    default: () => {},
  })
  rowClick;

  mounted() {
    this.initColumns();
  }

  initColumns() {
    this.showColumns = false;
    this.columnDataCopy = [...this.columnData];
    this.columnKeys = this.columnData.filter((item) => item.key !== 'operate'); // 弹窗上展示的 key
    this.selectColumns = this.columnData.map((item) => item.key); // 展示列的 key
  }

  handleSizeChange(pageSize) {
    console.log('pageSize = ', pageSize);
    this.currentPage = 1;
    this.pageSize = pageSize;
    this.pageChange({
      pageSize,
      pageIndex: 1,
    });
  }

  handleCurrentChange(currentPage, reset = false) {
    console.log('pageIndex = ', currentPage);
    this.currentPage = currentPage;
    if (!reset) {
      this.pageChange({
        pageSize: this.pageSize,
        pageIndex: currentPage,
      });
    }
  }

  toggleSelection(rows: any[], selected?: boolean) {
    selected = !!selected;
    if (rows) {
      rows.forEach((row) => {
        (this.$refs.multipleTable as any).toggleRowSelection(row, selected);
      });
    } else {
      (this.$refs.multipleTable as any).clearSelection();
    }
  }

  // 自定义列
  handleSetColumns() {
    let includesWidth = 0;
    let everyWidth = 0;
    let minWidth = 1000;
    let newColumns = this.columnDataCopy.filter((item) => {
      if (this.selectColumns.includes(item.key)) {
        includesWidth += Number(item.width);
        return true;
      }
      return false;
    });
    let length = this.selectColumns.length;
    let hasOperate = this.selectColumns.includes('operate');
    if (includesWidth < minWidth) {
      everyWidth = Math.ceil((minWidth - includesWidth) / (hasOperate ? length - 1 : length));
    }
    let columnData = newColumns.map((item) => {
      let width = Number(item.width);
      if (item.key !== 'operate') {
        width = width + everyWidth;
      } else {
        width = length === 1 ? 980 : 130;
      }
      return { ...item, width };
    });
    this.$emit('changeColumnData', columnData);
    this.handleColumnsClose();
  }

  // 重置自定义列
  handleResetColumns() {
    this.$emit('changeColumnData', [...this.columnDataCopy]);
    this.selectColumns = this.columnDataCopy.map((item) => item.key);
  }

  // 关闭自定义列
  handleColumnsClose() {
    this.showColumns = false;
    this.selectColumns = this.columnData.map((item) => item.key);
  }

  // 排序
  sortChange(sortable: any) {
    // sortable.order: ascending 升序 | descending 降序
    // sortable.prop: 当前列对应的 key
    let { order, prop } = sortable;
    this.tableData.sort((a, b) => {
      let flag = moment(a[prop]).valueOf() > moment(b[prop]).valueOf();
      return order == 'descending' ? !flag : flag;
    });
    this.$emit('changeTableData', [...this.tableData]);
  }

  getSelectable(row, index) {
    return typeof row.selectable === 'undefined' ? true : row.selectable;
  }

  getRowKeys(row) {
    return this.rowKey ? row[this.rowKey] : row.id;
  }

  rowClass({ row, column, rowIndex, columnIndex }) {
    return this.padding ? 'cost-row-padding' : '';
  }

  headerClass({ row, column, rowIndex, columnIndex }) {
    if (this.padding) {
      if (this.addStar) {
        if (columnIndex <= 2 || columnIndex === 6) {
          return 'star-class';
        }
      }
      return 'cost-herder-padding';
    }
    return '';
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
<style lang="less">
@import './reset.less';
</style>
