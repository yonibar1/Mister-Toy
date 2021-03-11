<template>
  <el-form class="filter-form" ref="form" label-width="120px">
    <el-form-item label="Name">
      <el-input @input="setFilter" v-model="filterBy.name"></el-input>
    </el-form-item>

    <el-form-item label="Sort By">
      <el-select
        @change="setFilter"
        v-model="filterBy.sortBy"
        placeholder="Sort By"
      >
        <el-option label="Name" value="name"></el-option>
        <el-option label="Price" value="price"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Availables Only">
      <el-switch @change="setFilter" v-model="filterBy.inStock"></el-switch>
    </el-form-item>

    <el-form-item label="Price">
      <el-input-number
        v-model="filterBy.price"
        :min="0"
        :max="100000000"
        @change="setFilter"
      ></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script>
import { utilService } from "@/services/util.service.js";
export default {
  data() {
    return {
      filterBy: {
        name: "",
        inStock: false,
        price: 0,
        sortBy: "name",
      },
    };
  },
  methods: {
    showMsg() {
      this.$notify({
        title: "Filter Setted",
        message: "Filter Set Success",
        type: "success",
      });
    },
    setFilter() {
      this.$store.commit({
        type: "setFilter",
        filter: JSON.parse(JSON.stringify(this.filterBy)),
      });
      this.showMsg();
    },
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter, 500);
  },
};
</script>

<style>
</style>