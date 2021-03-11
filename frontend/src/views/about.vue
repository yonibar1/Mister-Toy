<template>
  <div class="about">
    <h1>About Us!</h1>
    <div class="map">
      <google-map></google-map>
    </div>
  </div>
</template>
<script>
import googleMap from "@/cmps/google-map";
export default {
  components: { googleMap },
};
</script>

