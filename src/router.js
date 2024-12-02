import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./components/Home"),
  },
  {
    path: "/AllProducts",
    alias: "/AllProducts",
    name: "AllProducts",
    component: () => import("./components/AllProducts"),
  },
  {
    path: "/login",
    alias: "/login",
    name: "login",
    component: () => import("./components/Login"),
  },
  {
    path: "/Register",
    alias: "/Register",
    name: "Register",
    component: () => import("./components/Register"),
  },
  {
  path: '/product-detail/:id',
  name: 'ProductDetails',
  component: () => import('./components/ProductDetails.vue')
  },
  {
    path: "/Faq",
    alias: "/Faq",
    name: "Faq",
    component: () => import("./components/Faq"),
  },
  {
    path: "/BlogPage",
    alias: "/BlogPage",
    name: "BlogPage",
    component: () => import("./components/BlogPage"),
  },
  {
    path: "/blog/:id",
    name: "BlogDetails",
    component: () => import("./components/BlogDetails"),
  },
  {
    path: "/MyProfile",
    alias: "/MyProfile",
    name: "MyProfile",
    component: () => import("./components/MyProfile"),
  },
  {
    path: "/EditProfile",
    alias: "/EditProfile",
    name: "EditProfile",
    component: () => import("./components/EditProfile"),
  },
  {
    path: "/my-orders",  
    alias: "/MyOrders",  // '/MyOrders' will also lead to this route
    name: "MyOrders",  // Component to display all orders
    component: () => import("./components/MyOrders"),
  },
  {
    path: "/Cart",
    alias: "/Cart",
    name: "Cart",
    component: () => import("./components/Cart"),
  },
  {
    path: "/Wishlist",
    alias: "/Wishlist",
    name: "Wishlist",
    component: () => import("./components/Wishlist"),
  },
  {
    path: "/Checkout",
    alias: "/Checkout",
    name: "Checkout",
    component: () => import("./components/Checkout"),
  },
  {
    path: "/thank-you",
    name: "ThankYou",
    component: () => import("./components/ThankYou"),
  },
  {
    path: "/invoice",
    name: "Invoice",
    component: () => import("./components/Invoice"),
  },
  {
    path: "/ComboDeals",
    name: "ComboDeals",
    component: () => import("./components/ComboDeals"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
