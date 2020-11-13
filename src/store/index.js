import Vue from "vue";
import Vuex from "vuex";
// Modules
import User from './User';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        modalAddState: false,
        modalSuccessState:false,
        modalEditState: false,
        modalDeleteState: false,
        modalNotificationState: false,
    },
    mutations: {
        modalAdd_State(state, value) {
            state.modalAddState = value;
        },
       modalSuccess_State(state,value){
            state.modalSuccessState = value;
       },
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
