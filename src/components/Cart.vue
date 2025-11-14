<template>
  <div class="cart">
    <h2>Your Cart</h2>

    <!-- Empty Cart Message -->
    <div v-if="items.length === 0">
      <p>Your cart is empty</p>
    </div>

    <!-- Cart Items -->
    <ul v-else>
      <li v-for="(item, index) in items" :key="index">
        <div>
          {{ item.subject }} - £{{ item.price }}
          <span class="spaces">spaces left: {{ item.spaces }}</span>
        </div>
        <button @click="$emit('remove-from-cart', index)">Remove</button>
      </li>
    </ul>

    <!-- Total Price -->
    <div v-if="items.length > 0" class="total">
      <strong>Total: £{{ totalPrice }}</strong>
    </div>

    <!-- Clear Cart Button With Confirmation -->
    <button v-if="items.length > 0" class="clear-btn" @click="confirmClearCart"
        >
      Clear Cart
    </button>
  </div>
</template>

<script>
export default {
    name: 'Cart',
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    computed: {
        totalPrice() {
            return this.items.reduce((sum, item) => sum + item.price, 0);
        }
    },
    methods: {
        confirmClearCart() {
            if (confirm('Are you sure you want to clear the cart?')) {
                this.$emit('clear-cart');
            }

        }
    }
};
</script>

<style scoped>
.cart {
    background-color: #ffffff;
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
}

.cart h2 {
    color: #2e4d8f;
    border-bottom: 12px;
}

.cart ul {
    list-style: none;
    padding: 0;
}

.cart li {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart button {
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 6px 12px; 
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease; 
}

.cart button:hover {
    background-color: #e85c5c;
}

.total {
    margin-top: 12px;
    font-size: 1.1em;
    color: #333;
}

.spaces {
    display: block;
    font-size: 0.9em;
    color: #555;
    margin-top: 4px;
}

.clear-btn {
    margin-top: 12px;
    background-color: #999;
}

clear-button:hover {
    background-color: #777;
}
</style>
