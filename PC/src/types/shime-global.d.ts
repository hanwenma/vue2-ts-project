interface ConstantTypes {
  Paper_Status: any;
  Financial_Audit_Status: any;
  Financial_Audit_Status_Name: any;
  Business_Audit_Status: any;
}

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
  GlobalConstant: ConstantTypes;
}

declare var window: Window;

declare var document: Document;

declare var Omplayer: Any;

declare var Viewer: Any;

declare module 'vue-i18n';

declare var TMap: Any;
