import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/post/:postId",
      name: "post",
      component: () => import("../views/PostView.vue"),
      props: true,
    },
    {
      path: "/create/:postId?",
      name: "create",
      component: () => import("../views/CreatePostView.vue"),
      props: true,
    },
  ],
});

export default router;
