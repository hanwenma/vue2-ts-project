# ··· SvgIcon（svg 引用）

## 属性

| 参数      | 说明       |  类型  | 可选值 | 默认值 | 必传 |
| :-------- | :--------- | :----: | :----: | :----: | :--: |
| svgName   | svg 文件名 | String |   -    |   -    |  Y   |
| className | 自定义样式 | String |   -    |   -    |  N   |

## 基础用法

- 1、 将 svg 文件放入`./assets/svg/icons/`下(命名建议用英文)
- 2、 `SvgIcon`已被注入到全局，在任何组件中可直接调用

```tsx
<template>
    <SvgIcon :svg-name="`在./assets/svg/icons/路径下svg文件名`"></SvgIcon>
</template>;
```

## 实例

```txt
···
├── src                       项目源码目录
···
│   ├── assets                    静态资源目录，公共的静态资源，图片，字体等
│   │   ├── images
│   │   ├── svg                       svg文件
│   │   │   ├── icons                   svg文件放在此目录下
│   │   │   │   ├── example.svg
│   │   │   │   ├── eye.svg
│   │   │   │   ├── form.svg
│   │   │   │   ├── ibz.svg
│   │   │   │   ···
│   │   │   └── index                   svg处理文件
│   │   ···
···
```

```tsx


<template>
  <div class="icons" >
    <SvgIcon :svg-name="`example`"></SvgIcon>
    <SvgIcon :svg-name="`eye`"></SvgIcon>
    <SvgIcon :svg-name="`form`"></SvgIcon>
    <SvgIcon :svg-name="`ibz`"></SvgIcon>
    <SvgIcon :svg-name="`iff`"></SvgIcon>
    <SvgIcon :svg-name="`ild`"></SvgIcon>
  </div>
</template>

// ... other code

```
