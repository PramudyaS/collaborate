import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

import Home from "../views/Home.vue";
import AppLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../views/auth/Login";
import Dashboard from "../views/Dashboard.vue";

import NotFound from "@/components/404.vue";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.token) {
    next();
    console.log("not logged in");
    return;
  }
  console.log(from);
  next("/project");
};

const Authenticated = (to, from, next) => {
  if (store.state.token) {
    next();
    console.log("logged in");
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    beforeEnter: ifNotAuthenticated,
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
        path: "my_profile",
        component: () => import("../views/my_profile/Index")
      },
      {
        path: "/project",
        component: Dashboard,
        name: "dashboard",
        beforeEnter: Authenticated,
        children: [
          {
            path: "create",
            component: () => import("../views/projects/Create"),
            name: "project.create"
          }
        ]
      },
      {
        path: "/project/:id",
        component: () => import("../views/projects/Show"),
        name: "project.show",
        beforeEnter: Authenticated,
        meta: {
          breadcrumb: [{ text: "Projects", href: "/project", active: true }]
        }
      },
      {
        path: "/task/:id",
        component: () => import("../views/task/Show"),
        name: "task.show",
        beforeEnter: Authenticated,
        meta: {
          breadcrumb: [
            { text: "project", href: "/project" },
            { text: "task", href: "/task", active: true }
          ]
        }
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

export default router;
