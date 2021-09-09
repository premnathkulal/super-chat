import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@lottiefiles/lottie-player';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { sliceText } from '@/utils/filters';
import { timeDate } from '@/utils/filters';

import {
  faCoffee,
  faSearch,
  faComments,
  faUsers,
  faUser,
  faMoon,
  faPlusCircle,
  faSun,
  faSmile,
  faPaperclip,
  faCamera,
  faPaperPlane,
  faMicrophone,
  faChevronLeft,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCoffee,
  faSearch,
  faComments,
  faUsers,
  faUser,
  faPlusCircle,
  faMoon,
  faSun,
  faSmile,
  faPaperclip,
  faCamera,
  faPaperPlane,
  faMicrophone,
  faChevronLeft,
  faInfoCircle
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.filter('sliceText', sliceText);
Vue.filter('timeDate', timeDate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
