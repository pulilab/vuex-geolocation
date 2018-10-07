function sync (store, options) {
  if (!(store && store.commit && store.registerModule && store.state)) {
    throw new TypeError('Invalid Vuex instance provided');
  }

  const defaults = {
    autoWatch: true,
    moduleName: 'geolocation',
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };
  options = {...defaults, ...options};
  const mutations = {
    'LOCATION_CHANGED' (state, {lat, lng, acc, alt, altAcc, head, spd, ts}) {
      state.lat = lat;
      state.lng = lng;
      state.acc = acc;
      state.alt = alt;
      state.altAcc = altAcc;
      state.head = head;
      state.spd = spd;
      state.ts = ts;
    },
    'LOCATION_ERROR' (state, error) {
      state.error.code = error.code;
      state.error.message = error.message;
    },
    'SET_WATCH_ID' (state, watchID) {
      state.watchID = watchID;
    }
  };
  store.registerModule(options.moduleName, {
    namespaced: true,
    state: {
      lat: null,
      lng: null,
      acc: null,
      alt: null,
      altAcc: null,
      head: null,
      spd: null,
      ts: null,
      watchID: null,
      error: {
        code: null,
        message: ''
      }
    },
    mutations
  });

  function success ({coords: {latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed}, timestamp}) {
    store.commit(`${options.moduleName}/LOCATION_CHANGED`, {
      lat: latitude,
      lng: longitude,
      acc: accuracy,
      alt: altitude,
      altAcc: altitudeAccuracy,
      head: heading,
      spd: speed,
      ts: timestamp
    });
    store.commit(`${options.moduleName}/LOCATION_ERROR`, { code: null, message: '' });
  }
  function error (error) {
    store.commit(`${options.moduleName}/LOCATION_ERROR`, error);
  }
  function setWatchId (id) {
    store.commit(`${options.moduleName}/SET_WATCH_ID`, id);
  }
  function getWatchId () {
    const moduleName = options.moduleName;
    if (store && store.state && store.state[moduleName]) {
      return store.state[moduleName].watchID;
    }
  }

  function watchPosition () {
    if (getWatchId() !== null && getWatchId() !== undefined) {
      error({code: null, message: 'Watch position is already running, unable to start it again'});
    }
    if (navigator && 'geolocation' in navigator) {
      const id = navigator.geolocation.watchPosition(success, error, options);
      setWatchId(id);
    } else {
      error({code: null, message: 'Geolocation API is not present in this browser'});
    }
  }
  function clearWatch () {
    const id = getWatchId();
    if (id !== null && id !== undefined) {
      navigator.geolocation.clearWatch(id);
      setWatchId(null);
    }
  }
  function getCurrentPosition (maximumAge) {
    options.maximumAge = maximumAge;
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function unsync () {
    if (store) {
      store.unregisterModule(options.moduleName);
    }
    clearWatch();
  };

  if (options.autoWatch) {
    watchPosition();
  }

  function install (Vue) {
    Vue.prototype.$vuexGeolocation = {
      unsync,
      watchPosition,
      clearWatch,
      getCurrentPosition
    };
  }
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
    return {
      install,
      watchPosition,
      unsync,
      getCurrentPosition,
      clearWatch,
      getWatchId,
      setWatchId,
      error,
      success,
      options,
      mutations
    };
  }
  return install;
};

export default { sync };
