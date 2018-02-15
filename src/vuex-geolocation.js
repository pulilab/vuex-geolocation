export default {
  options: {
    autoWatch: true,
    moduleName: 'geolocation',
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  },
  store: null,
  watchID: null,
  success ({coords: {latitude, longitude}}) {
    this.store.commit(`${this.options.moduleName}/LOCATION_CHANGED`, {lat: latitude, lng: longitude});
    this.store.commit(`${this.options.moduleName}/LOCATION_ERROR`, {code: null, message: ''});
  },
  error (error) {
    this.store.commit(`${this.options.moduleName}/LOCATION_ERROR`, error);
  },
  setWatchId (id) {
    this.store.commit(`${this.options.moduleName}/SET_WATCH_ID`, id);
  },
  getWatchId () {
    return this.store.state[this.options.moduleName].watchID;
  },
  sync (store, options) {
    this.options = {...this.options, ...options};
    this.store = store;
    store.registerModule(this.options.moduleName, {
      namespaced: true,
      state: {
        lat: null,
        lng: null,
        watchID: null,
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
        },
        'SET_WATCH_ID' (state, watchID) {
          state.watchID = watchID;
        }
      }
    });
    if (this.options.autoWatch) {
      this.watchPosition();
    }
    return this.unsync;
  },
  watchPosition () {
    if (this.getWatchId() !== null && this.getWatchId() !== undefined) {
      this.error({code: null, message: 'Watch position is already running, unable to start it again'});
    }
    if ('geolocation' in navigator) {
      const id = navigator.geolocation.watchPosition(this.success.bind(this), this.error.bind(this), this.options);
      this.setWatchId(id);
    } else {
      this.error({code: null, message: 'Geolocation API is not present in this browser'});
    }
  },
  clearWatch () {
    if (this.getWatchId() !== null && this.getWatchId() !== undefined) {
      navigator.geolocation.clearWatch(this.getWatchId());
      this.setWatchId(null);
    }
  },
  getCurrentPosition () {
    navigator.geolocation.watchPosition(this.success.bind(this), this.error.bind(this), this.options);
  },
  unsync () {
    if (this.store) {
      this.store.unregisterModule(this.options.moduleName);
    }
    this.clearWatch();
  }
};
