import { Noop } from '@utils/eleNoop';

export default {
  path: '/list',
  redirect: '/list/query',
  name: '数据查询',
  component: Noop,
  children: [
    {
      path: '/list/query',
      name: '查询',
      component: () => import('@/views/list/query'),
    },
    {
      path: '/list/detail',
      name: '详情',
      component: () => import('@/views/list/detail'),
    },
  ],
};
