# API

### Methods

#### sync(store, configuration)

The first argument needs to be the Vuex store instance. The second argument is an optional configuration object
The configuration object is composed by the following properties:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autoWatch | `Boolean`|  `true` | Determine if the plugin starts immediately to check the user position |
| moduleName | `String` | `'geolocation'` | Set the Vuex store module name |
| enableHighAccuracy | `Boolean` | `true` | See [PositionOptions.enableHighAccuracy](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/enableHighAccuracy) |
| maximumAge | `Number` | `30000` | see [PositionOptions.maximumAge](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/maximumAge) |
| timeout | `Number` | `27000` | see [PositionOptions.timeout](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/timeout) |


`modulename` and `autoWatch` controls the plugin behavior, all the other parameters go straight to the configuration of the geolocation service. For a full list of configuration and a more detailed exploitation please refer to [this MDN article](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition) and
[this article](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)

This methods returns the **unsyc** function


#### unsync()
Function returned by the sync method and also accessible from the the plugin instance, if called remove the store integration and stop the watch position service.


#### watchPosition()
If `autoWatch` is not set to `true` or if the watch was stopped by `clearWatch()` this function enable the position tracking again


#### clearWatch()

Manually stop the position tracking, but it preserve the store integration and the already stored values


#### getCurrentPosition()
Instead of constantly tracking the user position this method check for the user position only once and set the store accordingly, the `watchID` variable will be still set to `null`


### Geolocation Utilities

At the moment only one method is present in the additional library:

#### getGeoDistance(start, end)

This is a simple straight line distance between start point and end point.
both `start` and `end` are expected to be in the form:
```js
{
    lat: Number,
    lng: Number
}
```

This function **returns** a `float` with the distance between the two points in meeters.