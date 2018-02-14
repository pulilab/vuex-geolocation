export default {
  options: {
    moduleName: 'geolocation',
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  },
  store: null,
  unwatchPosition: null,
  success ({coords: {latitude, longitude}}) {
    this.store.commit(`${this.options.moduleName}/LOCATION_CHANGED`, {lat: latitude, lng: longitude});
  },
  error (error) {
    this.store.commit(`${this.options.moduleName}/LOCATION_ERROR`, error);
  },
  sync (store, options) {
    this.options = {...this.options, ...options};
    this.store = store;
    store.registerModule(this.options.moduleName, {
      namespaced: true,
      state: {
        lat: null,
        lng: null,
        error: {
          code: null,
          message: ''
        }
      },
      mutations: {
        'LOCATION_CHANGED' (state, {lat, lng}) {
          state.lat = lat;
          state.lng = lng;
        },
        'LOCATION_ERROR' (state, error) {
          state.error.code = error.code;
          state.error.message = error.message;
        }
      }
    });
    if ('geolocation' in navigator) {
      this.unwatchPosition = navigator.geolocation.watchPosition(this.success.bind(this), this.error.bind(this), this.options).clearWatch;
    } else {
      this.error('Geolocation API is not present in this browser');
    }
    return this.unsync;
  },
  unsync () {
    if (this.store) {
      this.store.unregisterModule(this.options.moduleName);
    }
    if (this.unwatchPosition) {
      this.unwatchPosition();
    }
  }
};
