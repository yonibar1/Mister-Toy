<template>
  <section class="map-container">
    <GmapMap
      ref="mapRef"
      :center="{ lat: 31.771959, lng: 35.217018 }"
      :zoom="9"
      map-type-id="terrain"
      style="width: 600px; height: 400px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
    <div class="map-buttons-container">
      <el-button
        v-for="marker in markers"
        @click="goTo(marker.position)"
        :key="marker._id"
        >{{ marker.name }}</el-button
      >
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    goTo(pos) {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo(pos);
      });
    },
  },
  data() {
    return {
      markers: [
        {
          _id: "123",
          name: "Jerusalem",
          position: { lat: 31.771959, lng: 35.217018 },
        },
        {
          _id: "124",
          name: "Tel Aviv",
          position: { lat: 32.0853, lng: 34.781769 },
        },
        {
          _id: "125",
          name: "Kfar Tavor",
          position: { lat: 32.688229, lng: 35.421181 },
        },
        {
          _id: "126",
          name: "Eilat",
          position: { lat: 29.55036, lng: 34.952278 },
        },
      ],
    };
  },
};
</script>

<style>
</style>