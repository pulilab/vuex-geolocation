import GeolocationUtilities from '../src/geolocation-utilities';

test('getGeoDistance calculate correct distance', () => {
  const start = {
    lat: 47.5101381,
    lng: 19.0492428
  };
  const nullIsland = {
    lat: 0,
    lng: 0
  };
  const result = GeolocationUtilities.getGeoDistance(start, nullIsland);
  expect(result).toBe(5595566.378856167);
});

test('expose a Install function that patch the Vue prototype', () => {
  const Vue = {
    prototype: {}
  };
  GeolocationUtilities.install(Vue);
  expect(Vue.prototype.$getGeoDistance).toBeDefined();
});
