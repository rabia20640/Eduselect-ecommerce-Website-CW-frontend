<template>
  <!-- Lesson card container styled with css -->
  <div class="lesson-card">
    <div class="card-content">

    <!-- Shows the icons for each lesson card -->
     <img :src="lesson.image" :alt="lesson.subject" class="lesson-icon" /> 

    <!-- Text on the right -->
     <div class="lesson-details">
     <!-- Shows the subject of the lesson -->
    <h3>{{ lesson.subject }}</h3>

    <!-- Shows the location of the lesson -->
    <p>Location: {{ lesson.location }}</p>

    <!-- Shows the price of the lesson -->
    <p>Price: £{{ lesson.price }}</p>
    
    <!-- Shows how many spaces are available-->
    <p>Spaces: {{ lesson.spaces }}</p>
    <p v-if="lesson.spaces ===0" class="full-message">Fully booked</p>

    <!-- Emits an event to add this lesson to the cart -->
    <button 
    @click="$emit('add-to-cart', lesson)"
    :disabled="lesson.spaces === 0"
    >
    Add to cart
  </button>
  </div>
  </div>
  </div>
</template>

<script>
// This lets the component use lesson details passed in from another part of the app //
export default {
  props: ["lesson"],
};
</script>

<style scoped>
button {
  background-color: #0078d4;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #005fa3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.lesson-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.lesson-details {
  flex-grow: 1;
}
</style>
