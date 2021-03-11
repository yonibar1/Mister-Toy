<template>
  <section v-if="toyToShow" class="toy-details-container">
    <el-card class="box-card-details">
      <div class="text item">
        {{ "Name: " + toyToShow.name }}
      </div>
      <div class="text item">
        {{ "Price: " + toyToShow.price }}
      </div>
      <div class="text item">
        {{ "Type: " + toyToShow.type }}
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      toyToShow: null,
    };
  },
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch({ type: "getToyToEdit", id }).then((toy) => {
      this.toyToShow = toy;
    });
  },
};
</script>
