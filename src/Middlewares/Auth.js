// import store from '../store';
// import router from '../router/index';

export default function auth({next, router}){
    if(!localStorage.getItem('access_token')){
        return router.push({name: 'login'});
    }
    return next();
}
