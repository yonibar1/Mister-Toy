<script>
import { Doughnut } from "vue-chartjs";

export default {
  props: ["toys"],
  extends: Doughnut,
  created() {},
  computed: {},
  data() {
    return {
      toyTypes: ["Funny", "Educational", "Adult"],
      avilableToys: [0, 0, 0],
    };
  },
  mounted() {
    this.toys.forEach((toy) => {
      if (toy.type === "funny" && toy.inStock) this.avilableToys[0]++;
      if (toy.type === "educational" && toy.inStock) this.avilableToys[1]++;
      if (toy.type === "adult" && toy.inStock) this.avilableToys[2]++;
    });
    this.renderChart({
      labels: this.toyTypes,
      datasets: [
        {
          label: "Price",
          backgroundColor: ["#f87979", "#f12392", "#f27212"],
          data: this.avilableToys,
        },
      ],
    });
  },
};
</script>