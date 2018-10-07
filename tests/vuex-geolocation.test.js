
describe('sync function', () => {
  let VuexGeolocation = null;
  beforeEach(() => {
    VuexGeolocation = require('../src/vuex-geolocation').default;
  });

  test('extends the default options', () => {
    const store = {
      registerModule: jest.fn(),
      commit: jest.fn(),
      state: {}
    };
    const options = {
      test: 1
    };
    const vg = VuexGeolocation.sync(store, options);
    expect(vg.options.test).toBe(1);
  });
  test('throw a TypeError if a Vuex store is not passed or malformed', () => {
    const store = {
      registerModule: jest.fn()
    };
    ;
    expect(() => VuexGeolocation.sync(store, {})).toThrowError(TypeError);
  });
  test('calls registerModule with the specified name', () => {
    const store = {
      registerModule: jest.fn(),
      commit: jest.fn(),
      state: {}
    };
    const vg = VuexGeolocation.sync(store, {});
    expect(store.registerModule).toBeCalledWith(vg.options.moduleName, expect.any(Object));

    VuexGeolocation.sync(store, {moduleName: 'a'});
    expect(store.registerModule).toBeCalledWith('a', expect.any(Object));
  });
  test('Vuex module registered is always namespaced', () => {
    const store = {
      registerModule: jest.fn(),
      commit: jest.fn(),
      state: {}
    };
    const module = {
      namespaced: true,
      state: expect.any(Object),
      mutations: expect.any(Object)
    };
    VuexGeolocation.sync(store, {});
    expect(store.registerModule).toBeCalledWith(expect.any(String), module);
  });
  test('calls watchPosition by default', () => {
    const store = {
      registerModule: jest.fn(),
      commit: jest.fn(),
      state: {}
    };
    navigator.geolocation = {
      watchPosition: jest.fn()
    };
    VuexGeolocation.sync(store, {});

    expect(navigator.geolocation.watchPosition).toBeCalled();

    navigator.geolocation.watchPosition.mockClear();
    VuexGeolocation.sync(store, {autoWatch: false});
    expect(navigator.geolocation.watchPosition).not.toBeCalled();
  });

  test('returns the install function', () => {
    const store = {
      registerModule: jest.fn(),
      commit: jest.fn(),
      state: {}
    };

    const result = VuexGeolocation.sync(store, {});
    expect(result.install).toBeDefined();
  });

  test('adds the correct mutations in the store', () => {
    const store = {
      registerModule (name, s) { this.mutations = s.mutations; },
      commit: jest.fn(),
      state: {}
    };
    VuexGeolocation.sync(store, {});
    expect(store.mutations['LOCATION_CHANGED']).toBeDefined();
    expect(store.mutations['LOCATION_ERROR']).toBeDefined();
    expect(store.mutations['SET_WATCH_ID']).toBeDefined();

    const state = {
      error: {}
    };
    store.mutations['LOCATION_CHANGED'](state, {lat: 1, lng: 2, acc: 3, alt: 4, altAcc: 5, head: 6, spd: 7, ts: 8});
    store.mutations['LOCATION_ERROR'](state, {code: 1, message: 'a'});
    store.mutations['SET_WATCH_ID'](state, 3);

    expect(state).toEqual({
      lat: 1,
      lng: 2,
      acc: 3,
      alt: 4,
      altAcc: 5,
      head: 6,
      spd: 7,
      ts: 8,
      error: {
        code: 1,
        message: 'a'
      },
      watchID: 3
    });
  });
});

describe('watchPosition', () => {
  let VuexGeolocation = null;

  beforeEach(() => {
    VuexGeolocation = require('../src/vuex-geolocation').default;
  });

  test('does not run if is already running', () => {
    const store = {
      registerModule: jest.fn(),
      commit: jest.fn(),
      state: {
        geolocation: {
          watchID: 1
        }
      }
    };
    const vg = VuexGeolocation.sync(store, {});
    vg.watchPosition();
    expect(store.commit).toBeCalledWith('geolocation/LOCATION_ERROR',
      {code: null, message: 'Watch position is already running, unable to start it again'});
  });
});
