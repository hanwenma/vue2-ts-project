# ··· ContentBox（模块分割线）

## 属性

| 参数  | 说明     |  类型  | 可选值 | 默认值 | 必传 |
| :---- | :------- | :----: | :----: | :----: | :--: |
| title | 模块描述 | String |   -    |   ''   |  Y   |

## 基础用法

```tsx
import ContentBox from '@/components/ContentBox';

<ContentBox title="标题">
  <div slot="content">这是内容</div>
</ContentBox>;
```

## 实例

```tsx
<template>
<div>
  <ContentBox title='标题'>
    <div slot='content'>
      这是内容
      <div class="view">
        m1
      </div>
    </div>
  </ContentBox>
</div>

</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import ContentBox from "@/components/ContentBox";

@Component({
  components: {
    ContentBox
  },
})
export default class M1 extends Vue {
  PageMenu = [] as any;
  async initPage() {

  }

  router(url: string) {
    this.$router.push(url);
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>


```
