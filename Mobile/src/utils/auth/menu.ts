// import { getUserMenus, getUserRole, getUser } from '@api/modules/system';
// import { Noop } from '@utils/eleNoop';

// // ********** 业务模块一 **********
// const ETMS_RS_BORROWINGMANAGEMENT_APPLY = () => import('@/views/testView/m1');
// const ETMS_RS_BORROWINGMANAGEMENT_QUERY = () => import('@/views/testView/m2');

// const setComponent = (code) => {
//   switch (code) {
//     // ********** 业务模块一 **********
//     case 'ETMS_RS_BORROWINGMANAGEMENT_APPLY':
//       return ETMS_RS_BORROWINGMANAGEMENT_APPLY;
//     case 'ETMS_RS_BORROWINGMANAGEMENT_QUERY':
//       return ETMS_RS_BORROWINGMANAGEMENT_QUERY;
//     default:
//       return Noop;
//   }
// };

// export const Menus = async () => {
//   const menus = await getUserMenus();
//   console.log('getMenus >>>>>>>>> menus ', menus);

//   let routsArray: any = [];
//   menus.map((item: any) => {
//     // 一级目录
//     let first: any = {
//       path: item.url,
//       name: item.name,
//       redirect: item.children[0].url,
//       component: Noop,
//       children: [],
//     };
//     item.children.map((cItem: any) => {
//       let second: any = {
//         path: cItem.url,
//         name: cItem.name,
//         component: setComponent(cItem.code),
//       };
//       first.children.push(second);
//     });
//     // console.log(' menus >>>>> first : ', first);
//     routsArray.push(first);
//   });
//   console.log(' menus >>>>> routsArray : ', routsArray);
//   return routsArray;
// };
