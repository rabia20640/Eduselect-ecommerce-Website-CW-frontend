<template>
  <!--Section container for showing a grid of lesson cards -->
  <section class="lesson-grid">
    <!-- Loading and error states -->
     <p v-if="loading"> Loading lessons... </p>
     <p v-if="error">{{ error }}</p>
    <!-- Loop through each lesson in the lessons prop and render a LessonCard component -->
    <lesson-card
      v-for="lesson in lessons"
      :key="lesson._id"
      :lesson="lesson"
      @add-to-cart="$emit('add-to-cart', $event)"
    />
  </section>
</template>
<!--Iterate over lessons array, Unique key for each lesson card, pass lesson data as a prop to LessonCard, emit add-to-cart event to parent -->

<script>
// Import the LessonCard component used to show individual lesson details
import LessonCard from "./LessonCard.vue";
 import { fetchLessons } from "../api/api.js"
export default {
  name: "LessonGrid",
  components: { LessonCard },
  data() {
    return {
      lessons: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      this.lessons = await fetchLessons(); // call backend
    } catch (err) {
      this.error = "Failed to load lessons.";
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>

