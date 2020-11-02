import Vue from "vue";
import Vuex from "vuex";
// Modules
import User from './User';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        modalAddState: false,
        // modalViewState: false,
        modalEditState: false,
        modalDeleteState: false,
        modalNotificationState: false,
    },
    mutations: {
        modalAdd_State(state, value) {
            state.modalAddState = value;
        },
        // modalView_State(state, value) {
        //     state.modalViewState = value;
        // },
        modalEdit_State(state, value) {
            state.modalEditState = value;
        },
        modalDelete_State(state, value) {
            state.modalDeleteState = value;
        },
        modalNotification_State(state, value) {
            state.modalNotificationState = value;
        },
    },
    actions: {},

    modules: {
        User
    },
});