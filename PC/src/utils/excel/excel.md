# ··· excel 解析及导出

## exportExcel（导出 xlsx）

| 方法      | 说明           |  类型   | 可选值 | 默认值 | 必传 |
| :-------- | :------------- | :-----: | :----: | :----: | :--: |
| data      | 导出数据       |  Array  |   -    |   ''   |  Y   |
| columns   | 导出列及列名称 |  Array  |   -    |   ''   |  Y   |
| fileName  | 导出文件名称   | String  |   -    |   ''   |  N   |
| showTitle | 是否显示表头   | Boolean |   -    |   ''   |  N   |

## 基础用法

```ts
import { exportExcel } from '@/commom/excel/';

let data = [
  { a: 1, b: 1 },
  { a: 2, b: 2 },
];
let columns = [
  { dataIndex: 'a', title: '名称A' },
  { dataIndex: 'b', title: '名称B' },
];
exportExcel(data, columns, '文件名称1');
```

## parseExcel（解析 xlsx）

| 方法 | 说明      |    类型    | 可选值 | 默认值 | 必传 |
| :--- | :-------- | :--------: | :----: | :----: | :--: |
| file | xlsx 文件 | FileObject |   -    |   ''   |  Y   |

## 基础用法

```ts
import { parseExcel } from '@/commom/excel/';

exportExcel(file);
```
