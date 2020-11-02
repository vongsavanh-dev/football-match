import axios from 'axios';
import router from '../router/index';
const state = {
    token: localStorage.getItem('access_token') || null,
    userProfile: {},
    msgErrors: '',
};

const getters = {
    LoggedIn(state) {
        return state.token !== null;
    },

    // getUserType(state) {
    //     let profile = window.localStorage.getItem('user_profile');
    //     if (profile) {
    //         try {
    //             profile = JSON.parse(profile);
    //         } catch (err) {
    //             profile = {}
    //         }
    //     } else {
    //         profile = {};
    //     }

    //     if (Object.keys(state.userProfile).length) {
    //         return state.userProfile;
    //     }
    //     return profile.role_user;
    // },
    getToken(state) {
        return state.token;
    },
    isAuth(state) {
        return state.token && state.token !== null;
    },
    ShowMsgErrors(state) {
        return state.msgErrors;
    }
};
const mutations = {
    CommitToken(state, token) {
        state.token = token
    },

    Commit_ErrorLogin(state, payload) {
        state.msgErrors = payload;
    },
    destroyToken(state) {
        state.token = null;
    },


};
const actions = {
    LoginUser(context, data) {
        return new Promise((resolve, reject) => {
            axios.post('user/login', {
                    email: data.email,
                    password: data.password
                })
                .then(response => {
                    resolve(response)
                    const token = response.data.access_token;
                    localStorage.setItem('access_token', token); // ເກັ ບ Token ໄວ້ໃນ Localstorage ເພື່ອຈະນຳໄປໃຊ້ຂໍຂໍ້ມູນ
                    context.commit('CommitToken', token);
                    /*    context.commit('setUserProfile', response.data.userInfo); */
                    /*   window.localStorage.setItem('user_profile', JSON.stringify(response.data.userInfo)); */

                    router.push({ name: 'dashboard' });
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                })
                .catch(error => {
                    reject(error)
                    context.commit('Commit_ErrorLogin', 'ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ...');
                    // if (error.response.status == 401) {
                    //     context.commit('Commit_ErrorLogin', 'ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ...');
                    //     setTimeout(() => {
                    //         context.commit('Commit_ErrorLogin', '');
                    //     }, 3000);
                    // } else if (error.response.status == 400) {
                    //     context.commit('Commit_ErrorLogin', 'ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ...');
                    //     setTimeout(() => {
                    //         context.commit('Commit_ErrorLogin', '');
                    //     }, 3000);
                    // }
                })
        })
    },

    // Logout User
    destroyToken(context) {
        if (context.getters.LoggedIn) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('user/logout')
                    .then(response => {
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
                    .finally(response => {
                        resolve(response)
                        localStorage.removeItem('access_token') // Remove Item Of Localstorage...
                        localStorage.removeItem('user_profile') // Remove Item Of Localstorage...
                        context.commit('destroyToken')
                        router.push({
                            name: 'login'
                        }).catch(() => {});
                    })
            })
        }
    },

};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}