<template>
  <div class="editor">
    <tp-editor v-model="tinymceHtml" :init="editorConfig"></tp-editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import Tinymce from "tinymce"; // tinymce默认hidden，不引入不显示
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver"; // 主题
import "tinymce/icons/default"; // 图标
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";

@Component({
  components: {
    "tp-editor": Editor
  }
})
export default class ComponentEditor extends Vue {
  // 初始化编辑器内容
  @Prop({
    default: ""
  })
  initHtml!: string;

  // 监控 父组件传过来的值，并更新到编辑器
  @Watch("initHtml")
  onChangeInitHtml(newVal: string, oldVal: string) {
    this.tinymceHtml = newVal;
  }
  
  // 宽度
  @Prop({
    default: "100%"
  })
  width!: string;

    // 高度
  @Prop({
    default: "500"
  })
  height!: string;

  // 默认值
  defaultHtml = `<p><span style="font-family: 'andale mono', monospace; color: #ced4d9;">请输入内容~~</span></p>`;

  // 编辑器内容
  tinymceHtml = "" as string;
  // 监控 编辑器变化，并更新子组件值
  @Watch("tinymceHtml")
  onChangeTinymceHtml(newVal: string, oldVal: string) {
    this.tinymceHtml = newVal;
    // 传递给父组件
    this.sendEditorVal(this.tinymceHtml);
    // 状态管理
  }

  // ********* 父子组件传值方式 *********

  // 此处绑定父组件 bindsend
  @Emit("editorBindSend")
  sendEditorVal(editorVal: string) {
    // 中间可以加处理逻辑
    return editorVal;
  }

  // 配置
  editorConfig = {
    language_url: "/tinymce/langs/zh_CN.js",
    language: "zh_CN", //调用放在langs文件夹内的语言包
    skin_url: "tinymce/skins/ui/oxide", // 亮色系
    // toolbar: false, // 隐藏工具栏
    // menubar: false, // 隐藏菜单栏
    branding: false, // 隐藏右下角技术支持
    contextmenu: "bold copy ", // 指定上下文菜单出现的项目。
    draggable_modal: true, // 模态窗口允许拖动
    elementpath: false, // 隐藏底栏的元素路径
    statusbar: false, // 显示隐藏状态栏
    width: this.width,
    height: this.height,
    toolbar1: `styleselect  fontselect  formatselect  fontsizeselect  forecolor backcolor  bold italic underline strikethrough  image  media  table|alignleft aligncenter alignright alignjustify  outdent indent  numlist bullist  preview removeformat  hr  paste code  link  undo redo  fullscreen`, //选中时出现的快捷工具，与插件有依赖关系
    plugins: ["link", "table"] //选择需加载的插件
  };

  mounted() {
    this.initPage();
  }

  initPage() {
    // 初始化
    Tinymce.init({});
    // 初始化值
    this.tinymceHtml = this.initHtml == "" ? this.defaultHtml : this.initHtml;
  }

  // 清空
  clear() {
    this.tinymceHtml = "";
  }
}
</script>

<style scoped lang="less">
@import "./index.less";
</style>
