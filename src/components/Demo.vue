<template>
  <div>
    <div>
      Coords: {{location}}
      <br>
      Error: {{error}}
      <br>
      Id: {{watchID}}
    </div>
    <div>
      <button @click="clearWatch"> Clear Watch </button>
      <button @click="watchPosition"> Watch Position </button>
      <button @click="getCurrentPosition"> Get Current Position </button>
    </div>

    <div>
      To properly test the plugin results is possible to override your position through the chrome console, please refer to
       <a href="https://developers.google.com/web/tools/chrome-devtools/device-mode/device-input-and-sensors" target="_blank">
       this page of the Chrome documentation
       </a>

    </div>
  </div>
</template>

<script>
import VuexGeolocation from '../vuex-geolocation.js';
export default {
  computed: {
    location () {
      return {lat: this.$store.state.geolocation.lat, lng: this.$store.state.geolocation.lng};
    },
    error () {
      return this.$store.state.geolocation.error;
    },
    watchID () {
      return this.$store.state.geolocation.watchID;
    }
  },
  methods: {
    clearWatch () {
      VuexGeolocation.clearWatch();
    },
    watchPosition () {
      VuexGeolocation.watchPosition();
    },
    getCurrentPosition () {
      VuexGeolocation.getCurrentPosition();
    }
  }
};
</script>

<style>

</style>
