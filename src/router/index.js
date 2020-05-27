import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AppLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../views/auth/Login";
import Dashboard from "../views/Dashboard.vue";

import NotFound from "@/components/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "",
        component: Login,
        name: "login"
      }
    ]
  },
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "",
        component: Home
      },
      {
        path: "/dashboard",
        component: Dashboard,
        name: "dashboard"
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/logout"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user-token");
  console.log(loggedIn);
  if (!loggedIn && authRequired) {
    return next("/login");
  }

  if (to.name === "login" && loggedIn) {
    return next("/dashboard");
  }

  next();
});

export default router;
