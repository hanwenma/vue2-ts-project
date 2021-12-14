import * as VueRouter from 'vue-router';
declare module 'vue-router/types/router' {
  interface VueRouter {
    options: RouterOptions;
  }
}
