<template>
  <div class="home">
    <div class="img-filter-container">
      <toy-filter />
      <img class="logo-img" alt="Toy logo" src="../assets/img/logo.png" />
      <!-- <img class="logo-img" alt="Toy logo" src="../assets/img/hero.jpg" /> -->
    </div>
    <toy-list @removeToy="removeToy" :toys="toys" />
  </div>
</template>



<script>
// @ is an alias to /src
import toyList from "@/cmps/toy-list.vue";
import toyFilter from "@/cmps/toy-filter.vue";

export default {
  name: "home",
  components: { toyList, toyFilter },
  data() {
    return {};
  },
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
  },
  methods: {
    removeToy(id) {
      this.$store.dispatch({ type: "removeToy", id });
    },
  },
  created() {
    this.$store.dispatch({ type: "query" });
  },
};
</script>
