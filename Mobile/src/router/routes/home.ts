import { Noop } from '@utils/eleNoop';

export default {
  path: '/',
  redirect: '/home',
  name: '首页',
  component: Noop,
  children: [
    {
      path: '/home',
      name: '首页',
      component: () => import('@/views/home'),
    }
  ]
};
