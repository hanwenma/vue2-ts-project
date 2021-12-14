// 导入自己需要的组件
import {
  Autocomplete,
  Button,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Container,
  DatePicker,
  Dialog,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Header,
  Image,
  InfiniteScroll,
  Input,
  Loading,
  Main,
  Message,
  MessageBox,
  Option,
  OptionGroup,
  Pagination,
  Radio,
  RadioGroup,
  Row,
  Select,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tooltip,
  Upload,
  Carousel,
  CarouselItem,
  Progress,
  Cascader,
  TimePicker,
  Popover,
  Backtop,
  Icon,
} from 'element-ui';
import SvgIcon from '@/components/SvgIcon'; // svg组件

// 保存全局唯一 Message 实例
let messageInstance: any = null;

// 重写 Message
const resetMessage = (options) => {
  if (messageInstance) {
    messageInstance.close();
  }
  messageInstance = Message(options);
};

const element = {
  install: function (Vue) {
    // 全局注册自定义组件
    const requireAll = (requireContext) => requireContext.keys().map(requireContext);
    const req = require.context('../assets/svg/icons', false, /\.svg$/);
    requireAll(req);

    Vue.component('SvgIcon', SvgIcon);

    // 全局注册组件库组件
    Vue.use(Tooltip);
    Vue.use(Button);
    Vue.use(Select);
    Vue.use(Input);
    Vue.use(Dialog);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Table);
    Vue.use(Upload);
    Vue.use(TableColumn);
    Vue.use(Pagination);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(DatePicker);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Drawer);
    Vue.use(Checkbox);
    Vue.use(CheckboxButton);
    Vue.use(CheckboxGroup);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(Image);
    Vue.use(Popover);
    Vue.use(InfiniteScroll);
    Vue.use(Loading);
    Vue.use(Autocomplete);
    Vue.use(Container);
    Vue.use(Header);
    Vue.use(Main);
    Vue.use(Carousel);
    Vue.use(CarouselItem);
    Vue.use(Progress);
    Vue.use(Cascader);
    Vue.use(TimePicker);
    Vue.use(Backtop);
    Vue.use(Icon);

    //  全局方法
    Vue.prototype.$message = resetMessage;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$loading = Loading.service;
  },
};
export default element;
