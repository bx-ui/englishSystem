import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css/normalize.css";

import "@/styles/reset.scss";
// import "@/element-var.scss";
import "@/styles/public.scss";

// 引入svg
import "@/icons";

import create from "@/utils/create.js";
Vue.prototype.$create = create;

// 引入echarts
import VCharts from "v-charts";
Vue.use(VCharts);

// 引入element-ui
import elementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(elementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
