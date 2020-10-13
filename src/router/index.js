import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/UI/Login.vue";
import Listteam from "../views/Team/list-team.vue";
import Listplayer from '../views/Player/ListPlayer.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  //login
  {
    path: "/login",
    name: Login,
    component: Login,
  },

  {
    path: "/list-team",
    name: "listteam",
    component: Listteam,
  },
  {
    path: '/list-player',
    name: 'Listplayer',
    component:Listplayer,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
