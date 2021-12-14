import { Loading } from 'element-ui';

let loading;
export function showLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.4)',
  });
}

export function closeLoading() {
  loading.close();
}
