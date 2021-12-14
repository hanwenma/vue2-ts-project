// 声明全局的 window
interface Window {
  decodeURI?: any;
  location: any;
  document: any;
  pageXOffset: any;
  pageYOffset: any;
  scrollTo: any;
  $pathPrefix: string;
  webkitURL: any;
  localStorage: any;
  [propsName: string]: any;
}

declare var window: Window;

declare var document: Document;

declare var Omplayer: Any;

declare var Viewer: Any;

declare module 'vue-i18n';
