import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Admin/Login.vue";
import Listteam from "../views/Team/list-team.vue";
import Listplayer from '../views/Player/ListPlayer.vue'
import Position from '../views/Position/ListPosition.vue'
import PlayerTeam from '../views/PlayerTeam/ListPlayerTeam.vue'
import Match from '../views/Match/MatchTable.vue'
import MatchScore from '../views/MatchScore/MatchScoreTable.vue'
import Tournament from '../views/Tournament/ListTournament.vue'
import  Group from '../views/Group/ListGroup.vue'
import Middlewares from '../Middlewares/Index'
import Dashboard from '../views/Dashboard'

Vue.use(VueRouter);

const routes = [{
        path: "/about",
        name: "About",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },

    {
        path:'/home',
        name:'dashboard',
        component:Dashboard,
        meta: {
            middleware: [Middlewares.auth],
          }
    },
    //login
    {
        path: "/",
        name: 'login',
        component: Login,
        meta: {
            middleware: [Middlewares.guest],
            hiddens: true,
        }
    },
    {
        path: "/list-team",
        name: "listteam",
        component: Listteam,
        meta: {
            middleware: [Middlewares.auth],
          }
    },
    {
        path: '/list-player',
        name: 'Listplayer',
        component: Listplayer,
        meta: {
            middleware: [Middlewares.auth],
          }
    },
    {
        path: '/playerteam/:team_id/player',
        name: 'playerteam',
        component: PlayerTeam,
        meta: {
            middleware: [Middlewares.auth],
          }
    },
    {
        path: '/Position',
        name: 'Position',
        component: Position,
    },

    {
        path: '/match',
        name: 'Match',
        component: Match,
        meta: {
            middleware: [Middlewares.auth],
          }
    },
    {
        path: '/match/:match_id',
        name: 'MatchScore',
        component: MatchScore,
        meta: {
            middleware: [Middlewares.auth],
          }
    },
    {
        path:'/tournament',
        name:'Tournament',
        component:Tournament,
        meta: {
            middleware: [Middlewares.auth],
          }
    },
    {
        path:'/group/:tournament_id/group',
        name:'Group',
        component:Group,
        meta: {
            middleware: [Middlewares.auth],
          }
    },


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

function nextCheck(context, middleware, index) {
    const nextMiddleware = middleware[index];
  
    if (!nextMiddleware) return context.next;
  
    return (...parameters) => {
      context.next(...parameters);
      const nextMidd = nextCheck(context, middleware, index + 1);
  
      nextMiddleware({ ...context, nextMidd });
    }
  }
  
  router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
      const ctx = {
        from,
        next,
        router,
        to
      }
  
      const nextMiddleware = nextCheck(ctx, middleware, 1);
      return middleware[0]({ ...ctx, nextMiddleware });
  
    }
    return next();
  });
  
export default router;
