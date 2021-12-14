# ··· Breadcrumb（面包屑）

> **说明：** 此面包屑根据是路由目录自动生成 object

```ts
// 路由对象
{
  name: '',
  path: ''
}
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 必传 |
| :--- | :--- | :--: | :----: | :----: | :--: |
| -    | -    |  -   |   -    |   -    |  -   |

## 用法

```tsx
<template>
  <Breadcrumb></Breadcrumb>
</template>;

import Breadcrumb from '@/components/Breadcrumb';
```

## 实例

```tsx
<template>
    <Breadcrumb></Breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Breadcrumb from '@/components/Breadcrumb';
@Component({
  components: {
    Breadcrumb,
  },
})
export default class Layout extends Vue {
// ...
```
