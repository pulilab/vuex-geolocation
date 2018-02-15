module.exports = (options, req) => {
  const base = {
    entry: {
      'vuex-geolocation': './src/vuex-geolocation.js',
      'geolocation-utilities': './src/geolocation-utilities.js'
    },
    sourceMap: false,
    vendor: false
  };

  const dev = {
    entry: './src/demo.js'
  };

  const production = {
    html: false,
    library: true,
    filename: {
      js: '[name].js'
    }
  };
  const extend = options.mode === 'production' ? production : dev;
  return {
    ...base,
    ...extend
  };
};
