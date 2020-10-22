import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Admin/Login.vue";
import Listteam from "../views/Team/list-team.vue";
import Listplayer from '../views/Player/ListPlayer.vue'
import Position from '../views/Position/ListPosition.vue'
import PlayerTeam from '../views/PlayerTeam/ListPlayerTeam.vue'
import Match from '../views/Match/MatchTable.vue'
import MatchScore from '../views/MatchScore/MatchScoreTable.vue'

Vue.use(VueRouter);

const routes = [{
        path: "/about",
        name: "About",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },

    //login
    {
        path: "/",
        name: 'login',
        component: Login,
        meta: {
            hiddens: true,
        }
    },

    {
        path: "/list-team",
        name: "listteam",
        component: Listteam,
    },
    {
        path: '/list-player',
        name: 'Listplayer',
        component: Listplayer,
    },
    {
        path: '/playerteam/:team_id/player',
        name: 'playerteam',
        component: PlayerTeam,
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
    },
    {
        path: '/match-score',
        name: 'MatchScore',
        component: MatchScore
    }

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;