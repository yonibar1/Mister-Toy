<script>
import { Bar } from "vue-chartjs";

export default {
  // props: ["toys"],
  props: {
    toys: {
      type: Array,
    },
  },
  extends: Bar,
  created() {},
  computed: {},
  data() {
    return { toyNames: [], toyPrices: [] };
  },
  mounted() {
    this.toys.forEach((toy) => {
      this.toyNames.push(toy.name);
      this.toyPrices.push(toy.price);
    });
    this.renderChart({
      labels: this.toyNames,
      datasets: [
        {
          label: "Price",
          backgroundColor: "#f87979",
          data: this.toyPrices,
        },
      ],
    });
  },
};
</script>