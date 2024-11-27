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
  },
  {
    path: "/ProductDetails",
    alias: "/ProductDetails",
    name: "ProductDetails",
    component: () => import("./components/ProductDetails")
  },
  {
    path: "/Faq",
    alias: "/Faq",
    name: "Faq",
    component: () => import("./components/Faq")
  },
  {
    path: "/MyProfile",
    alias: "/MyProfile",
    name: "MyProfile",
    component: () => import("./components/MyProfile")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;