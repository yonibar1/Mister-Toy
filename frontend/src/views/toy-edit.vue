<template>
  <div v-if="toyToEdit" class="toy-edit-container">
    <el-form class="filter-form" ref="form" label-width="120px">
      <el-form-item label="Name">
        <el-input required v-model="toyToEdit.name"></el-input>
      </el-form-item>

      <el-form-item label="Type">
        <el-select required v-model="toyToEdit.type" placeholder="Type">
          <el-option label="Funny" value="funny"></el-option>
          <el-option label="Educational" value="educational"></el-option>
          <el-option label="Adult" value="adult"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Available">
        <el-switch v-model="toyToEdit.inStock"></el-switch>
      </el-form-item>
      <el-form-item label="Price">
        <el-input-number
          v-model="toyToEdit.price"
          :min="0"
          :max="100000000"
          required
        ></el-input-number>
      </el-form-item>
      <el-button @click="saveToy">Save</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "toyEdit",
  data() {
    return {
      toyToEdit: null,
    };
  },
  computed: {},
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch({ type: "getToyToEdit", id }).then((toy) => {
      this.toyToEdit = toy;
    });
  },
  methods: {
    saveToy() {
      this.$store
        .dispatch({ type: "saveToy", toy: this.toyToEdit })
        .then(() => {
          this.$router.push(`/`);
        });
    },
  },
};
</script>

<style>
</style>