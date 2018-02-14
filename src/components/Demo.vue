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

<style>

</style>
