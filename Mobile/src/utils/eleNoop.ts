import Vue from 'vue';

export const Noop = Vue.extend({
  name: 'Noop',
  render(createElement) {
    return createElement('router-view');
  },
});
