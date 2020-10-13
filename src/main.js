import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuesax from "vuesax";
import "bulma/css/bulma.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "vuesax/dist/vuesax.css"; //Vuesax styles
Vue.use(Vuesax, {});

/* Start import Modal */

import ModalAdd from "./components/Modals/Add";
import ModalEdit from './components/Modals/Edit'
import ModalDelete from './components/Modals/Delete';


Vue.component("ModalAdd", ModalAdd);
Vue.component('ModalEdit', ModalEdit);
Vue.component('ModalDelete', ModalDelete);

/* End import Modal */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
