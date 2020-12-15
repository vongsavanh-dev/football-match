import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuesax from "vuesax";
import "bulma/css/bulma.css";
import "./assets/scss/main.scss"
import VeeValidate from 'vee-validate';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import '../src/plugin/Axios';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import * as Notification from './plugin/Notification'
/* Start import Modal */
import ModalAdd from "./components/Modals/Add";
import ModalEdit from './components/Modals/Edit'
import ModalDelete from './components/Modals/Delete';
import ModalSuccess from './components/Modals/Success';
import ModalNotification from './components/Modals/Notification';
import ModalDrawScore from './components/Modals/DrawScore'
/* End import Modal */

Vue.use(VeeValidate);
Vue.use(Vuesax, {});
Vue.use(DatePicker)
Vue.component("ModalAdd", ModalAdd);
Vue.component('ModalEdit', ModalEdit);
Vue.component('ModalDelete', ModalDelete);
Vue.component('ModalSuccess', ModalSuccess);
Vue.component('ModalNotification', ModalNotification);
Vue.component('ModalDrawScore', ModalDrawScore);



Vue.config.productionTip = false;
Vue.prototype.$notification = Notification;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
