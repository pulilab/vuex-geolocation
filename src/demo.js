/* eslint-disable no-new,func-names */
import Vue from 'vue';
import Vuex from 'vuex';
import VuexGeolocation from './index.js';
import GeolocationUtilities from './geolocation-utilities.js';
import Demo from './components/Demo.vue';

Vue.use(Vuex);
Vue.use(GeolocationUtilities);

const store = new Vuex.Store({});

VuexGeolocation.sync(store);

new Vue({
  el: '#app',
  render: h => h(Demo),
  store
});
