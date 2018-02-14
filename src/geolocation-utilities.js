export default {
  getGeoDistance (start, end) {
    const deg2rad = deg => deg * (Math.PI / 180);
    const R = 6371;
    const dLat = deg2rad(end.lat - start.lat);
    const dLng = deg2rad(end.lng - start.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(start.lat)) * Math.cos(deg2rad(end.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
  },
  install (Vue) {
    Vue.prototype.$getGeoDistance = this.getGeoDistance;
  }
};
