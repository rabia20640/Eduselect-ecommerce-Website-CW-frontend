<template>
  <!--This is the sort panel section with radio button for different sorting criteria -->
  <section class="sort-panel">
    <label>Sort by:</label>
    <!-- Radio button to sort by subject -->
    <label>
      input type="radio" value="subject" v-model="selected" /> Subject
    </label>
    <!-- Radio button to sort by location -->
    <label>
      input type="radio" value="location" v-model="selected" /> Location
    </label>
    <!-- Radio button to sort by price -->
    <label>
      input type="radio" value="price" v-model="selected" /> Price
    </label>
    <!-- Radio button to sort by availability (spaces) -->
    <label>
      input type="radio" value="spaces" v-model="selected" />Availability
    </label>
  </section>
</template>

<script>
export default {
  // Component's reactive data
  data() {
    return {
      // Default selected sort option
      selected: "subject",
    };
  },
  watch: {
    // watcher will detect changes in the selected sort option
    selected(newVal) {
      // Exit a custom event 'sort-change' with the new value
      // This allows the parent component to react to the change
      this.$emit("sort-change", newVal);
    },
  },
};
</script>