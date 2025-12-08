<template>
  <!--This is the sort panel section with radio button for different sorting criteria -->
  <section class="sort-panel">
    <h3>Sort Lessons</h3>

    <label>Sort by:</label>
    <!-- Radio button to sort by subject -->
    <label>
      <input type="radio" value="subject" v-model="selectedField" /> Subject
    </label>
    <!-- Radio button to sort by location -->
    <label>
      <input type="radio" value="location" v-model="selectedField" /> Location
    </label>
    <!-- Radio button to sort by price -->
    <label>
      <input type="radio" value="price" v-model="selectedField" /> Price
    </label>
    <!-- Radio button to sort by availability (spaces) -->
    <label>
      <input type="radio" value="spaces" v-model="selectedField" />Spaces
    </label>
<!-- Ascending or descending order -->
    <label>Order:</label>
    <label>
      <input type="radio" value="asc" v-model="selectedOrder" /> Ascending
    </label>
    <label>
      <input type="radio" value="desc" v-model="selectedOrder" /> Descending
    </label>
  </section>
</template>

<script>
export default {
  // Component's reactive data
  data() {
    return {
      // Default selected sort option
      selectedField: "subject",
      selectedOrder: "asc",
    };
  },
  watch: {
    // watcher will detect changes in the selected sort option
    selectedField() {
      // Exit a custom event 'sort-change' with the new value
      // This allows the parent component to react to the change
      this.emitSort();
    },
    selectedOrder() {
      this.emitSort();
    },
  },
  methods: {
    emitSort() {
      this.$emit("sort-change", {
        field: this.selectedField,
        order: this.selectedOrder,
      });
    },
  },
};
</script>