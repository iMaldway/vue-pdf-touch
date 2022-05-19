import VuePdfTouch from "./VuePdfTouch/index.vue";
import VueTouch from 'vue-touch'

const components = [VuePdfTouch];

// 目的就是注册为全局组件
const install = function (Vue) {
  Vue.use(VueTouch, {name: 'v-touch'});
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

// 原生script tag引入方式
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  VuePdfTouch,
};
