import {createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Blog from "../components/Blog.vue";
import CreateBlog from "../components/CreateBlog.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog,
  },
  {
    path: "/create-blog",
    name: "create-blog",
    component: CreateBlog,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;