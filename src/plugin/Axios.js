import Vue from 'vue';
import axios from 'axios';
import store from '../store'

// Check Auth && Set Token To Header
if (store.getters['User/isAuth']) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['User/getToken'];
}

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

Vue.prototype.$axios = axios;