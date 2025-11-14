<template>
  <!-- Lesson card container styled with css -->
  <div class="lesson-card">

    <!-- Shows the subject of the lesson -->
    <h3>{{ lesson.subject }}</h3>

    <!-- Shows the location of the lesson -->
    <p>Location: {{ lesson.location }}</p>

    <!-- Shows the price of the lesson -->
    <p>Price: £{{ lesson.price }}</p>
    
    <!-- Shows how many spaces are available-->
    <p>spaces: {{ lesson.spaces }}</p>
    <p v-if="lesson.spces ===0" class="full-message">Fully booked</p>

    <!-- Emits an event to add this lesson to the cart -->
    <button: disabled="lesson.spaces === 0" @click="$emit('add-to-cart', lesson)">Add to cart</button:>
  </div>
</template>

<script>
// This lets the component use lesson details passed in from another part of the app //
export default {
  props: ["lesson"],
};
</script>
