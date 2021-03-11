<template>
  <div>
    <el-card class="box-card">
      <div class="clearfix">
        <span>{{ toy.name }}</span>
      </div>
      <div class="text item">
        {{ "Price: " + toy.price }}
      </div>
      <div class="text item">
        {{ "Available: " + isAvailable }}
      </div>
      <div class="text item">
        {{ "Type: " + toy.type }}
      </div>
      <div class="text item">
        <el-button
          class="el-icon-delete"
          circle
          plain
          type="danger"
          title="Remove"
          @click="removeToy(toy._id)"
        ></el-button>
        <el-button
          class="el-icon-edit"
          plain
          type="primary"
          circle
          title="Edit"
          @click="editToy(toy._id)"
        ></el-button>
        <el-button
          class="el-icon-document"
          plain
          circle
          type="info"
          title="Details"
          @click="showDetails(toy._id)"
        ></el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    toy: {
      type: Object,
    },
  },
  name: "toyPreview",
  computed: {
    isAvailable() {
      let ans = "❌";
      if (this.toy.inStock) ans = "✔️";
      return ans;
    },
  },
  methods: {
    showMsg() {
      this.$notify({
        title: "Toy Deleted",
        message: "You have deleted a Toy",
        type: "success",
      });
    },
    showDetails(id) {
      this.$emit("showDetails", id);
    },
    editToy(id) {
      this.$emit("editToy", id);
    },
    removeToy(id) {
      this.$emit("removeToy", id);
      this.showMsg();
    },
  },
};
</script>


