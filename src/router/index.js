import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import { Message } from "element-ui";

// layout组件
import layout from "@/views/layout/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: layout,
    redirect: "/indexPage",
    alwaysShow: true,
    meta: { hidden: false, name: "首页" },
    children: [
      {
        path: "/indexPage",
        name: "indexPage",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { hidden: false, name: "首页", icon: "el-icon-s-home" }
      },
      {
        path: "/organizational",
        name: "organizational",
        component: () => import("../views/organizational/index.vue"),
        meta: { hidden: false, name: "作文管理", icon: "el-icon-s-check" }
      },
      {
        path: "/member",
        name: "member",
        component: () => import("../views/member/index.vue"),
        meta: { hidden: false, name: "答题模块", icon: "el-icon-s-custom" }
      },
      {
        path: "/message",
        name: "message",
        component: () => import("../views/messageCenter/index.vue"),
        meta: { hidden: false, name: "用户管理", icon: "el-icon-s-custom" }
      }
    ]
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
    redirect: "/login/pass",
    children: [
      {
        path: "/login/code",
        name: "code",
        component: () => import("@/views/login/codeLogin.vue")
      },
      {
        path: "/login/pass",
        name: "pass",
        component: () => import("@/views/login/passLogin.vue")
      }
    ]
  },
  {
    path: "/titleDetail",
    name: "titleDetail",
    component: () => import("@/views/member/renderTitle.vue")
  },
  {
    path: "/codeRusult",
    name: "codeRusult",
    component: () => import("@/views/member/result.vue")
  },
  {
    path: "/userAgreement",
    name: "userAgreement",
    meta: { hidden: true, name: "用户协议" },
    component: () => import("@/views/userAgreement/index.vue")
  },
  {
    path: "/usageStandard",
    name: "usageStandard",
    meta: { hidden: true, name: "使用规范" },
    component: () => import("@/views/usageStandard/index.vue")
  },
  {
    path: "/privacyPolicy",
    name: "privacyPolicy",
    meta: { hidden: true, name: "隐私政策" },
    component: () => import("@/views/privacyPolicy/index.vue")
  },
  {
    path: "/helpCenter",
    name: "helpCenter",
    meta: { hidden: true, name: "帮助中心" },
    component: () => import("@/views/helpCenter/index.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(to, from);
  console.log(store.state.user.isLogin);
  if (store.state.user.isLogin) {
    if (to.name == "code" || to.name == "pass") {
      next(from.path);
    } else {
      next();
    }
  } else {
    console.log(to, "tototot");
    if (
      to.name == "code" ||
      to.name == "pass" ||
      to.name == "userAgreement" ||
      to.name == "usageStandard" ||
      to.name == "privacyPolicy" ||
      to.name == "helpCenter"
    ) {
      next();
    } else if (to.name == "indexPage") {
      next("/login");
    } else {
      Message.error("请进行登陆");
      next("/login");
    }
  }
});

// 避免重复路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
