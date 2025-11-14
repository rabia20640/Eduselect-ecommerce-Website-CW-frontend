<template>
  <div class="page-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Navigation</h2>
      <ui>
        <li>
          <a
            href="#"
            :class="{ active: currentView === 'home' }"
            @click.prevent="currentView = 'home'"
            >Home</a
          >
        </li>
        <li>
          <a
            href="#"
            :class="{ active: currentView === 'cart' }"
            @click.prevent="currentView = 'cart'"
            >Cart</a
          >
        </li>
        <li>
          <a
            href="#"
            :class="{ active: currentView === 'checkout' }"
            @click.prevent="currentView = 'checkout'"
            >Checkout</a
          >
        </li>
        <li>
          <a
            href="#"
            :class="{ active: currentView === 'orders' }"
            @click.prevent="currentView = 'orders'"
            >Orders</a
          >
        </li>
      </ui>
    </aside>

    <!-- Main content -->
    <div class="container">
      <!-- App title -->
      <!-- Home section: shows lessons, search, sort and add to cart -->
      <section v-if="currentView === 'home'"></section>
      <header>
        <h1>
          {{ sitename }} <span class="cart-count">({{ cart.length }})</span>
        </h1>
      </header>

      <!-- Search bar -->
      <div class="search-bar">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search lessons..."
        />
      </div>

      <!-- Sorting options -->
      <SortPanel @sort-change="updateSort" />

      <!-- Lesson grid -->
      <LessonGrid :lessons="sortedLessons" @add-to-cart="addToCart" />

      <!-- Shopping Cart -->
      <section v-if="currentView === 'cart'">
        <Cart :items="cart" @remove-from-cart="removeFromCart" />
      </section>

      <!-- Checkout form -->
      <section v-if="currentView === 'checkout'">
        <CheckoutForm @checkout-submit="handleCheckout" />
      </section>

      <!-- Order history section -->
      <section v-if="showOrders && orders.length">
        <h2>Order History</h2>
        <ul>
          <li v-for="(order, index) in orders" :key="index">
            <strong>{{ order.timestamp }}</strong
            ><br />
            {{ order.name }} ({{ order.phone }}) booked
            {{ order.items.length }} lesson(s)
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import LessonGrid from "./components/LessonGrid.vue";
import SortPanel from "./components/SortPanel.vue";
import LessonCard from "./components/LessonCard.vue";
import Cart from "./components/Cart.vue";
import CheckoutForm from "./components/CheckoutForm.vue";

export default {
  components: {
    LessonGrid,
    LessonCard,
    SortPanel,
    Cart,
    CheckoutForm,
  },
  data() {
    return {
      sitename: "Eduselect",
      currentView: "Home", // Only home section shows by default
      lessons: [
        {
          id: 1,
          subject: "Math",
          location: "Hendon Central",
          price: 100,
          spaces: 9,
        },
        {
          id: 2,
          subject: "Science",
          location: "Colindale",
          price: 85,
          spaces: 11,
        },
        {
          id: 3,
          subject: "Art",
          location: "Brent Cross",
          price: 50,
          spaces: 15,
        },
        {
          id: 4,
          subject: "English",
          location: "Colindale",
          price: 55,
          spaces: 7,
        },
        {
          id: 5,
          subject: "Music",
          location: "Edgware",
          price: 110,
          spaces: 22,
        },
        {
          id: 6,
          subject: "Design Technology",
          location: "Walthamstow",
          price: 54,
          spaces: 25,
        },
        {
          id: 7,
          subject: "Business",
          location: "Camden Town",
          price: 60,
          spaces: 30,
        },
        {
          id: 8,
          subject: "Drama",
          location: "High Barnet",
          price: 40,
          spaces: 32,
        },
        {
          id: 9,
          subject: "Religious Studies",
          location: "Leyron",
          price: 35,
          spaces: 31,
        },
        {
          id: 10,
          subject: "French",
          location: "Burnt Oak",
          price: 30,
          spaces: 10,
        },
      ],
      cart: [],
      orders: [],
      sortBy: "subject",
      sortOrder: "asc",
      searchTerm: "",
      showOrders: false, // Controls visability of the orders section
    };
  },
  computed: {
    sortedLessons() {
      const term = this.searchTerm?.toLowerCase() || "";
      const filtered = this.lessons.filter((lesson) => {
        return (
          lesson.subject.toLowerCase().includes(term) ||
          lesson.location.toLowerCase().includes(term)
        );
      });
      return filtered.sort((a, b) => {
        const key = this.sortBy;
        const order = this.sortOrder === "asc" ? 1 : -1;
        if (typeof a[key] === "string") {
          return a[key].localeCompare(b[key]) * order;
        }
        return (a[key] - b[key]) * order;
      });
    },
  },
  methods: {
    updateSort({ field, order }) {
      this.sortBy = field;
      this.sortOrder = order;
    },

    // Prevent duplicates and manage lesson spaces
    addToCart(lesson) {
      if (lesson.spaces > 0 && !this.cart.includes(lesson)) {
        this.cart.push(lesson);
        lesson.spaces--;
      } else {
        alert(`${lesson.subject} is fully booked or already in your cart.`);
      }
    },

    // Restore space when removing from cart
    removeFromCart(index) {
      const removed = this.cart.splice(index, 1)[0];
      const match = this.lessons.find((lesson) => lesson.id === removed.id);
      if (match) match.spaces++;
    },

    // Stores all the orders
    handleCheckout(details) {
      const order = {
        name: details.name,
        phone: details.phone,
        items: [...this.cart],
        timestamp: new Data().toLocaleString(),
      };
      this.orders.push(order);

      // Restore all spaces and clear cart on checkout
      alert(`Checkout complete for ${details.name} (${details.phone})`);
      this.cart.forEach((item) => {
        const match = this.lessons.find((lesson) => lesson.id === item.id);
        if (match) match.spaces++;
      });
      this.cart = [];
    },
  },
};
</script>

<style>
/* Cart count styling added */
.cart-count {
  font-size: 0.8em;
  color: #ff6b6b;
}
</style>
