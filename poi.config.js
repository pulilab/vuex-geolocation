module.exports = (options, req) => {
  const base = {
    entry: './src/index.js',
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
      js: 'vuex-geolocation.js',
      chunk: '[id].chunk.js'
    }
  };
  const extend = options.mode === 'production' ? production : dev;
  return {
    ...base,
    ...extend
  };
};
