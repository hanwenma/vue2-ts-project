// import { MessageBox } from 'element-ui';

// const loginUrl = `http://passport.oa.com/modules/passport/signin.ashx?appkey=6ed4670763a24c3e97b512ef8126aa9f&title=%E7%A8%8E%E5%8A%A1%E8%B4%AD%E6%B1%87%E5%B9%B3%E5%8F%B0&url=${encodeURIComponent(
//   window.location.href,
// )}`;

// /* 业务状态码处理 */
// export const businessStatusCode = (result: any) => {
//   switch (result.code) {
//     case 2001:
//       MessageBox.alert(`登录失败，请联系管理员！`, '登录状态异常', {
//         type: 'error',
//       }).then(() => {
//         window.location.href = loginUrl;
//       });
//       break;
//     case 2002:
//       MessageBox.alert(`您的Token已无效！`, '登录状态异常', {
//         type: 'error',
//       }).then(() => {
//         window.location.href = loginUrl;
//       });
//       break;
//     case 2003:
//       MessageBox.alert(`您的Token已过期！`, '登录状态异常', {
//         type: 'error',
//       }).then(() => {
//         window.location.href = loginUrl;
//       });
//       break;
//     default:
//       MessageBox.alert(result.message, '系统异常', {
//         type: 'error',
//       });
//   }
// };

// /* 请求状态码处理 */
// export const httpStatusCode = (result: any) => {
//   switch (result.code) {
//     case 404:
//       MessageBox.alert(`请联系管理员！`, '网络异常', {
//         type: 'error',
//       }).then(() => {
//         window.location.href = loginUrl;
//       });
//       break;
//     default:
//       MessageBox.alert(result.message, '网络异常', {
//         type: 'error',
//       }).then(() => {
//         window.location.href = loginUrl;
//       });
//   }
// };
