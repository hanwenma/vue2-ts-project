// 导入自己需要的组件
import SvgIcon from '@/components/SvgIcon'; // svg组件

const plugins = {
  install: function (Vue) {
    // 全局注册自定义组件
    const requireAll = (requireContext) => requireContext.keys().map(requireContext);
    const req = require.context('../assets/svg/icons', false, /\.svg$/);
    requireAll(req);

    Vue.component('SvgIcon', SvgIcon);

    // 全局注册组件库组件

    //  全局方法
    
  },
};
export default plugins;
