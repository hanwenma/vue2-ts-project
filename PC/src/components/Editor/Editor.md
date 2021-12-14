# ··· Editor（富文本编辑器）

> 布局暂无对外属性

## 属性

| 参数           | 说明       |   类型   | 可选值 | 默认值 | 必传 |
| :------------- | :--------- | :------: | :----: | :----: | :--: |
| initHtml       | 富文本内容 |  Object  |   -    |   -    |  Y   |
| width          | 宽度       |  String  |   -    | "100%" |  N   |
| height         | 高度       |  String  |   -    |  500   |  N   |
| editorBindSend | 返回数据   | Function |   -    |   -    |  N   |

## 基础用法

```tsx

<template>
  <Editor
    @editorBindSend="getEditorValue"
    :init-html="initHtml"
    ref="editor"
  ></Editor>
</template>

import Editor from '@/components/Editor';

```

## 实例

```tsx
<template>
  <div class="view">

      <div style="width:100%;padding:30px;">
        {{initHtml}}
      </div>
      <div style="width:100%;">
        <button @click="clearEditor" type="info"  style="margin:30px;">
          &nbsp; 清 &nbsp; 空 &nbsp;
        </button>
        <Editor
          @editorBindSend="getEditorValue"
          :init-html="initHtml"
          ref="editor"
        ></Editor>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import {Button} from '@tencent/tdesign-vue';
import InfoTitle from '@/components/InfoTitle';
import Editor from '@/components/Editor';

@Component({
  components: {
    Editor,
    "t-button":Button,
    InfoTitle,
  },
})
export default class M1 extends Vue {

  initHtml=`<h1 style="margin: 0px 0px 1.4em; color: #1a1a1a; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', 'WenQuanYi Micro Hei', sans-serif; background-color: #ffffff; text-align: left;"><span style="text-decoration: underline;"><em><span style="font-family: impact, sans-serif;"><strong><span style="font-size: 18pt;"><span style="color: #e03e2d; background-color: #c2e0f4; text-decoration: underline;">箫声咽，秦娥梦断秦楼月。</span><span style="color: #e03e2d; background-color: #c2e0f4; text-decoration: underline;">秦楼月，年年柳色，灞陵伤别。</span></span></strong></span></em></span></h1> <h1 style="margin: 1.4em 0px; color: #1a1a1a; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', 'WenQuanYi Micro Hei', sans-serif; background-color: #ffffff; text-align: left;"><span style="text-decoration: underline;"><em><span style="font-family: impact, sans-serif;"><strong><span style="font-size: 18pt;"><span style="color: #e03e2d; background-color: #c2e0f4; text-decoration: underline;">乐游原上清秋节，咸阳古道音尘绝。</span><span style="color: #e03e2d; background-color: #c2e0f4; text-decoration: underline;">音尘绝，西风残照，汉家陵阙。</span></span></strong></span></em></span></h1> <p style="text-align: left;"><span style="text-decoration: underline;"><em><span style="font-family: impact, sans-serif;"><strong><span style="color: #e03e2d; background-color: #c2e0f4; font-size: 18pt; text-decoration: underline;">&mdash; &mdash;《忆秦娥&middot;箫声咽》</span></strong></span></em></span></p>`;

  clearEditor() {
    const refsObj = this.$refs as any;
    console.log("clearEditor >>>>>>>>> refsObj : ", refsObj);
    refsObj.editor.clear() as any;
  }

  getEditorValue(editorHtml: string) {
    console.log("setEditor >>>>>>>>>> editorHtml: ", editorHtml);
    this.initHtml = editorHtml;
  }


// ... other code

```
