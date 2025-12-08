<template>
  <!--Section container for showing a grid of lesson cards -->
  <section class="lesson-grid">
    <!-- Loop through each lesson in the lessons prop and render a LessonCard component -->
    <lesson-card
      v-for="lesson in lessons"
      :key="lesson.id"
      :lesson="lesson"
      @add-to-cart="$emit('add-to-cart', $event)"
    />
  </section>
</template>
<!--Iterate over lessons array, Unique key for each lesson card, pass lesson data as a prop to LessonCard, emit add-to-cart event to parent -->

<script>
// Import the LessonCard component used to show individual lesson details
import LessonCard from "./LessonCard.vue";

export default {
  name: "LessonGrid",
  components: { LessonCard },
  props: {
    lessons: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>

