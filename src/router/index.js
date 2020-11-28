import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Admin/Login.vue";
import Listteam from "../views/Team/list-team.vue";
// import Listplayer from '../views/Player/ListPlayer.vue'
import PlayerTeam from '../views/PlayerTeam/ListPlayerTeam.vue'
import Match from '../views/Match/MatchTable.vue'
import MatchScore from '../views/MatchScore/MatchScoreTable.vue'
import Tournament from '../views/Tournament/ListTournament.vue'
import Group from '../views/Group/ListGroup.vue'
import Middlewares from '../Middlewares/Index'
import Dashboard from '../views/Dashboard'
import ListGroupMember from '../views/GroupMember/ListGroupMember'
import GroupStanding from '../views/GroupStanding/ListGroupStanding'
import ListStanding from '../views/TeamStanding/ListStanding'
import ListTeamStanding from '../views/ListTeamStanding/ListTeamStanding'
import MatchStanding from '../views/MatchStanding/MatchStandingTable'
import Staff from '../views/Staff/ListStaff'
import Hightlight from '../views/MatchHightLight/Matchheight'
import ImageArtwork from '../views/ImageArtwork/ImageArtwork'


Vue.use(VueRouter);

const routes = [{
    path: "/about",
    name: "About",
    component: () =>
        import ( /* webpackChunkName: "about" */ "../views/About.vue"),
},

    {
        path: '/admin-dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            middleware: [Middlewares.auth],
        }
    },
    //login
    {
        path: "/admin-login",
        name: 'login',
        component: Login,
        meta: {
            middleware: [Middlewares.guest],
            hiddens: true,
        }
    },
    {
        path: "/admin-list-team",
        name: "listteam",
        component: Listteam,
        meta: {
            middleware: [Middlewares.auth],
        }
    },
    // {
    //     path: '/admin-list-player',
    //     name: 'Listplayer',
    //     component: Listplayer,
    //     meta: {
    //         middleware: [Middlewares.auth],
    //       }
    // },
    {
        path: '/admin-playerteam/:team_id/player',
        name: 'playerteam',
        component: PlayerTeam,
        meta: {
            middleware: [Middlewares.auth],
        }
    },
    // {
    //     path: '/Position',
    //     name: 'Position',
    //     component: Position,
    // },

    {
        path: '/admin-match',
        name: 'Match',
        component: Match,
        meta: {
            middleware: [Middlewares.auth],
        }
    },
    {
        path: '/admin-match/:match_id',
        name: 'MatchScore',
        component: MatchScore,
        meta: {
            middleware: [Middlewares.auth],
        }
    },
    {
        path: '/admin-tournament',
        name: 'Tournament',
        component: Tournament,
        meta: {
            middleware: [Middlewares.auth],
        }
    },
    {
        path: '/admin-group/:tournament_id/group',
        name: 'Group',
        component: Group,
        meta: {
            middleware: [Middlewares.auth],
        }
    },

    {
        path: '/admin-groupmember/:tournament_id/:group_id',
        name: 'groupmember',
        component: ListGroupMember,
        meta: {
            middleware: [Middlewares.auth],
        }
    },

    {
        path: '/admin-groupstanding',
        name: 'GroupStanding',
        component: GroupStanding,
        meta: {
            middleware: [Middlewares.auth],
        }
    },

    {
        path: '/admin-standing/:tournament_id',
        name: 'Standing',
        component: ListStanding,
        meta: {
            middleware: [Middlewares.auth]
        }
    },
    {
        // path:'/admin-listeamstanding/:tournament_id',
        // name:'ListTeamStanding',
        // component:ListTeamStanding,
        // meta: {
        //     middleware: [Middlewares.auth]
        // }
        path: '/admin-listeamstanding/:tournament_id/:standing_id',
        name: 'ListTeamStanding',
        component: ListTeamStanding,
        meta: {
            middleware: [Middlewares.auth]
        }
    },
    {
        path: '/admin-matchstanding',
        name: 'MatchStanding',
        component: MatchStanding,
        meta: {
            middleware: [Middlewares.auth]
        }
    },
    {
        path: '/admin-staff/:team_id',
        name: 'Staff',
        component: Staff,
        meta: {
            middleware: [Middlewares.auth]
        }
    },
    {
        path: '/admin-matchhight/:tournament_id',
        name: 'MatchHightLight',
        component: Hightlight,
        meta: {
            middleware: [Middlewares.auth]
        }
    },
    {
        path:'/admin-image-artwork/:tournament_id',
        name:'ImageArtwork',
        component:ImageArtwork,
        meta: {
            middleware: [Middlewares.auth]
        }
    }


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

        nextMiddleware({...context, nextMidd});
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
        return middleware[0]({...ctx, nextMiddleware});

    }
    return next();
});

export default router;
