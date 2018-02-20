/* eslint-disable no-new,func-names */
import Vue from 'vue';
import Vuex from 'vuex';
import VuexGeolocation from './vuex-geolocation.js';
import GeolocationUtilities from './geolocation-utilities.js';
import Demo from './components/Demo.vue';

Vue.use(Vuex);

const store = new Vuex.Store({});
const vuexGeolocation = VuexGeolocation.sync(store);
Vue.use(vuexGeolocation);
Vue.use(GeolocationUtilities);

new Vue({
  el: '#app',
  render: h => h(Demo),
  store
});
