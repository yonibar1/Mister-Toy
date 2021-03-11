<template>
  <div class="toy-list-container">
    <h2>Toy List</h2>
    <el-button circle type="success" plain @click="addToy">+</el-button>
    <ul class="toys-container" v-if="toys">
      <li v-for="toy in toys" :key="toy._id">
        <toy-preview
          @removeToy="removeToy"
          @editToy="editToy"
          @showDetails="showDetails"
          :toy="toy"
        ></toy-preview>
      </li>
    </ul>
    <div class="el-icon-loading" v-else></div>
    <nice-popup v-if="isPopup"> </nice-popup>
  </div>
</template>

<script>
import toyPreview from "./toy-preview.vue";
import nicePopup from "./nice-popup.vue";
export default {
  name: "toyList",
  props: {
    toys: {
      type: Array,
    },
  },
  data() {
    return {
      isPopup: false,
    };
  },
  components: { toyPreview, nicePopup },
  methods: {
    addToy() {
      this.$router.push(`/toy/`);
      this.isPopup = true;
      setTimeout(() => {
        this.isPopup = false;
      }, 2000);
    },
    editToy(id) {
      this.$router.push(`/toy/${id}`);
    },
    removeToy(id) {
      this.$emit("removeToy", id);
    },
    showDetails(id) {
      this.$router.push(`/toy/details/${id}`);
    },
  },
  created() {},
};
</script>
