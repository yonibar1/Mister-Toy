<template>
  <section class="dashboard-container">
    <div class="price-chart-container">
      <price-chart v-if="toys" :toys="toys" />
    </div>
    <div class="inventory-chart-container">
      <inventory-chart v-if="toys" :toys="toys" />
    </div>
  </section>
</template>

<script>
import priceChart from "@/cmps/price-chart";
import inventoryChart from "@/cmps/inventory-chart";
export default {
  components: { priceChart, inventoryChart },
  data() {
    return { toys: null };
  },
  created() {
    this.toys = this.$store.state.toyStore.toys;
  },
};
</script>
