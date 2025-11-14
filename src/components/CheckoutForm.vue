<template>
  <!-- Checkout form section -->
  <section class="checkout-form">
    <h2>Checkout</h2>
    <!-- Input field for user's name, bound to 'name' data property -->
    <input v-model="name" type="text" placeholder="Your Name" />
    <!-- Input field for user's phone number, bound to 'phone' data property -->
    <input v-model="phone" type="tel" placeholder="Phone Number" />
    <!-- Button to trigger the checkout submission -->
    <button @click="submit">Checkout</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // Stores user's name input
      name: "",
      // Stores user's phone number input
      phone: "",
    };
  },
  methods: {
    // This is triggered when the checkout button is clicked
    submit() {
      // Emit a custom event 'checkout-submit' with the form data
      // This allows the parent component to handle the submitted values
      this.$emit("checkout-submit", {
        name: this.name,
        phone: this.phone,
      });
    },
  },
};
</script>
