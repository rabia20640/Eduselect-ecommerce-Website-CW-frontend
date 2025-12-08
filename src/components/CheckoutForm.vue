<template>
  <!-- Checkout form section -->
  <section class="checkout-form">
    <h2>Checkout</h2>
    <!-- Input field for user's name, bound to 'name' data property -->
    <input v-model="name" type="text" placeholder="Your Name"/>
    <p v-if="nameError" class="error">{{ nameError }}</p>

    <!-- Input field for user's phone number, bound to 'phone' data property -->
    <input v-model="phone" type="tel" placeholder="Enter phone number" @input="filterDigits" />
         <p v-if="phoneError" class="error">{{ phoneError }}</p>

    <!-- Button to trigger the checkout submission -->
    <button class="checkout-btn" @click="submit">Checkout</button>
  </section>
</template>

<script>
export default {
  name: "checkoutForm",
  props: {
    nameError: String,
    phoneError: String,
    cart: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      // Stores user's name input
      name: "",
      // Stores user's phone number input
      phone: "",
    };
  },
  methods: {
    // Filters out non-digit characters from phone input
    filterDigits() {
      this.phone = this.phone.replace(/\D/g, "");
    },
    // This is triggered when the checkout button is clicked
    async submit() {
      if (!this.name.trim() || !this.phone.trim()) {
        alert("Please enter both name and phone number.");
        return;
      }
      // Emit the checkout details to parent component
      this.$emit("checkout-submit", {
        name: this.name,
        phone: this.phone,
      });
    },
  },
};
</script>


<style scoped>
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 4px;
}

.checkout-btn {
  background-color: #0078d4;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
</style>
