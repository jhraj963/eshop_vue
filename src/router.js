import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./components/Home")
  },
  {
    path: "/AllProducts",
    alias: "/AllProducts",
    name: "AllProducts",
    component: () => import("./components/AllProducts")
  },
  {
    path: "/login",
    alias: "/login",
    name: "login",
    component: () => import("./components/Login")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;