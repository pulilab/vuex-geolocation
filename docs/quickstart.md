# Quick Start

### Installation
Install the component through npm or yarn


```shell
npm install -s vuex-geolocation

yarn add vuex-geolocation
```

### Usage
!> To use this plugin, a module bundler is needed, the module is built in CommonJS format.

!> Besides `localhost`, the geolocation service and this plugin works only on **https**

```js
import Vue from 'vue';
import Vuex from 'vuex';
import VuexGeolocation from 'vuex-geolocation';

Vue.use(Vuex);

const store = new Vuex.Store({});

const vuexGeolocation = VuexGeolocation.sync(store);
Vue.use(vuexGeolocation)
```

At this point your store will contain a new module called geolocation (if not configured differently). The geolocation module has the following structure:

```js
{
    lat: Number,
    lng: Number,
    watchID: Number
    error: {
        code: Number
        message: String
    }
}
```

If the user accepts to share their position with the code, lat and lon will be filled with the user coordinates, otherwise the error message returned by the geolocation service are present in the `error Object`. If the plugin is actively tracking the user position the `watchID` parameter contains an ID.

An example of using the user position in your components is:

```html
<template>
  <div>
    {{location}}
    <br>
    {{error}}
  </div>
</template>

<script>
export default {
  computed: {
    location () {
      return {lat: this.$store.state.geolocation.lat, lng: this.$store.state.geolocation.lng}
    },
    error () {
      return this.$store.state.geolocation.error;
    }
  }
}
</script>
```


### Instance methods
>This are optionals and offer a more fine grained control over the behavior of the plugin, you can invoke any of the methods in your components instance.

All the methods are prefixed with `$vuexGeolocation` and can be used with ` this.$vuexGeolocation.methodName()`

See [Configuration](configuration) section for more details


### Additional GeoLocation Utilities

Optionally it is possible to import another mini set of utilities which contain fewer utilities' functions.
At the moment the only completed function is able to calculate the distance between two sets of coordinates. It is a rather simple function but effective.

```js
import Vue from 'vue';
import GeolocationUtilities from 'vuex-geolocation/dist/geolocation-utilities.js';

Vue.use(GeolocationUtilities);
```

With this code it is possible to use the function in your Vue components as follows:

```html
<template>
  <div>
    {{distance}}
  </div>
</template>

<script>
export default {
    data () {
        return {
            pointOne: {
                lat: 'X',
                lng: 'Y'
            },
            pointTwo: {
                lat: 'Z',
                lng: 'J'
            },
        }
    },
    computed: {
        distance () {
            return this.$getGeoDistance(this.pointOne, this.pointTwo)
        }
    }
}
</script>

```
