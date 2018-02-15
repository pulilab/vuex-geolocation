# Quick Start

### Installation
Install the component through npm or yarn


```shell
npm install -s vuex-geolocation

yarn add vuex-geolocation
```

### Usage
!> To use this plugin a module bundler is needed, the module is built in CommonJS format.

!> Beside `localhost` the geolocation service and this plugin works only on **https**

```js
import Vue from 'vue';
import Vuex from 'vuex';
import VuexGeolocation from './index.js';

Vue.use(Vuex);

const store = new Vuex.Store({});

VuexGeolocation.sync(store);
```

At this point your store will contain a new module called geolocation (if not differently configured). The geolocation module has the following structure:

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

If the user accept to share his/her position with the code lat and lon will be filled with the user coordinates, otherwise the error message returned by the geolocation service are present in the `error Object`. If the plugin is actively tracking the user position the `watchID` parameter contains an ID

An example on using the user position in your components is:

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

### Additional GeoLocation utilities

Optionally is possible to import another mini set of utility that contains few utilities function.
At the moment the only function finalized is to calculate the distance between two set of coordinates, it's a rather naive and simple function but effective.

```js
import Vue from 'vue';
import GeolocationUtilities from './vuex-geolocation/geolocation-utilities.js';

Vue.use(GeolocationUtilities);
```

After this code is possible to use the function in your Vue components as follow:

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
            return this.getGeoDistance(this.pointOne, this.pointTwo)
        }
    }
}
</script>

```
