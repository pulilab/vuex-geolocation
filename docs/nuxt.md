# Usage with NUXT

> The preferred way to use this component with nuxt is trough the use of a plugin

vuex-geolocation was born in a nuxt project and it works perfectly in combination with it.

Add a new plugin in your plugin folder and let's call it `vuex-geolocation.js`

```js
import VuexGeolocation from 'vuex-geolocation';
import GeolocationUtilities from 'vuex-geolocation/dist/geolocation-utilities.js';

export default ({store}) => {
    const vuexGeolocation = VuexGeolocation.sync(store);
    Vue.use(vuexGeolocation);
    Vue.use(GeolocationUtilities);
}

```

What is left is to enable the plugin in `nuxt.config.js`.
Since the geolocation is only available to the client we need to disable it on the server rendering.


```js
plugins: [
    ...
    { src: '~plugins/vuex-geolocation.js', ssr: false },
    ...
  ],
```
