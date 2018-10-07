# Demo


>This is an interactive demo, please accept the Position permission pop-up in the browser.

!> To test the plugin it is possible to change the browser location through the Chrome console. [Link to official documentation](https://developers.google.com/web/tools/chrome-devtools/device-mode/device-input-and-sensors)

<vuep template="#base"></vuep>

<script v-pre type="text/x-template" id="base">
  <template>
    <div>

      <div>
        {{state.geolocation.lat}}
        {{state.geolocation.lng}}
        {{state.geolocation.acc}}
        {{state.geolocation.alt}}
        {{state.geolocation.altAcc}}
        {{state.geolocation.head}}
        {{state.geolocation.spd}}
      </div>

      <div>
        {{state.geolocation.error}}
      </div>

      <div>
        {{state.geolocation.watchID}}
      </div>

      <div>
        <button @click="clearWatch"> Clear Watch </button>
        <button @click="watchPosition"> Watch Position </button>
        <button @click="getCurrentPosition"> Get Current Position </button>
      </div>

    </div>
  </template>

  <script>
    import VuexGeolocation from './code/vuex-geolocation.js';

    const options = {
      autoWatch: true,
      moduleName: 'geolocation',
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    }
    const store = new Vuex.Store({});
    const vG = VuexGeolocation.sync(store, options);
    Vue.use(vG)

    module.exports = {
      data: function () {
        return {
          state: store.state
        }
      },
      methods: {
        clearWatch () {
          this.$vuexGeolocation.clearWatch();
        },
        watchPosition () {
          this.$vuexGeolocation.watchPosition();
        },
        getCurrentPosition () {
          this.$vuexGeolocation.getCurrentPosition();
        }
      }
    }
  </script>
</script>
