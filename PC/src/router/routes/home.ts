import { Noop } from '@utils/eleNoop';

export default {
  path: '/',
  redirect: '/home',
  name: '首页',
  component: Noop,
  children: [
    {
      path: '/home',
      name: '首页', // 不需要在面包屑中展示可传 ''
      meta: {
        hideBreadcrumb: true, // 是否需要展示面包屑
        // titleName: '', // 但是需要在页面标签上显示
      },
      component: () => import('@/views/home'),
    }
  ]
};
