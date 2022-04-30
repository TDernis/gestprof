import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../App.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../components/pages/HomePage.vue")
    },
    {
      path: "/setup",
      name: "setup",
      component: () => import("../components/pages/SetupPage.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/pages/LoginPage.vue")
    },
    {
      path: "/manage/students",
      name: "manage:students",
      component: () => import("../components/pages/StudentManagementPage.vue")
    },
    {
      path: "/manage/exams",
      name: "manage:exams",
      component: () => import("../components/pages/ExamManagementPage.vue")
    },
  ]
})
