<template>
  <div class="page-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Navigation</h2>
      <ul>
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
      </ul>
    </aside>

    <!-- Main content -->
    <div class="container">
      <!-- App title -->
      <!-- Home section: shows lessons, search, sort and add to cart -->
      <section v-if="currentView === 'home'">
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
      </section>

      <!-- Shopping Cart Page -->
      <section v-if="currentView === 'cart'" class="cart-page">
        <h2 class="cart-title">Your Cart</h2>

        <div v-if="cart.length === 0" class="empty-cart-message">
          <p>Your cart is empty</p>
        </div>

        <div v-else class="cart-content">
          <Cart
            :items="cart"
            @remove-from-cart="removeFromCart"
            @clear-cart="clearCart"
            @go-to-checkout="currentView = 'checkout'"
          />
          <div class="total-price">Total: £{{ totalPrice }}</div>
        </div>
      </section>

      <!-- Checkout form -->
      <section v-if="currentView === 'checkout'">
        <CheckoutForm 
          :cart="cart"
          @checkout-submit="handleCheckout"
          :name-error="nameError"
          :phone-error="phoneError"
        />
      </section>

      <!-- Order history section -->
      <section v-if="currentView === 'orders'">
        <Orders :orders="orders" />
      </section>
    </div>
  </div>
</template>

<script>
// Importing all the components
import LessonGrid from "./components/LessonGrid.vue";
import SortPanel from "./components/SortPanel.vue";
import LessonCard from "./components/LessonCard.vue";
import Cart from "./components/Cart.vue";
import CheckoutForm from "./components/CheckoutForm.vue";
import Orders from "./components/Orders.vue";

// Importing my images
import calcIcon from "./assets/images/calc-icon.jpg";
import scienceIcon from "./assets/images/science-icon.jpg";
import artIcon from "./assets/images/art-icon.jpg";
import englishIcon from "./assets/images/english-icon.jpg";
import musicIcon from "./assets/images/music-icon.jpg";
import designIcon from "./assets/images/design-icon.jpg";
import businessIcon from "./assets/images/business-icon.jpg";
import dramaIcon from "./assets/images/drama-icon.jpg";
import rsIcon from "./assets/images/rs-icon.jpg";
import frenchIcon from "./assets/images/french-icon.jpg";

// Importing the API function
import { createOrder } from "./api/api.js";

export default {
  components: {
    LessonGrid,
    LessonCard,
    SortPanel,
    Cart,
    CheckoutForm,
    Orders,
  },
  data() {
    return {
      sitename: "Eduselect",
      currentView: "home", // Only home section shows by default
      lessons: [
        {
          id: 1,
          subject: "Math",
          location: "Hendon Central",
          price: 100,
          spaces: 5,
          image: calcIcon,
        },
        {
          id: 2,
          subject: "Science",
          location: "Colindale",
          price: 85,
          spaces: 4,
          image: scienceIcon,
        },
        {
          id: 3,
          subject: "Art",
          location: "Brent Cross",
          price: 50,
          spaces: 3,
          image: artIcon,
        },
        {
          id: 4,
          subject: "English",
          location: "Colindale",
          price: 55,
          spaces: 6,
          image: englishIcon,
        },
        {
          id: 5,
          subject: "Music",
          location: "Edgware",
          price: 110,
          spaces: 4,
          image: musicIcon,
        },
        {
          id: 6,
          subject: "Design Technology",
          location: "Walthamstow",
          price: 54,
          spaces: 2,
          image: designIcon,
        },
        {
          id: 7,
          subject: "Business",
          location: "Camden Town",
          price: 60,
          spaces: 7,
          image: businessIcon,
        },
        {
          id: 8,
          subject: "Drama",
          location: "High Barnet",
          price: 40,
          spaces: 4,
          image: dramaIcon,
        },
        {
          id: 9,
          subject: "Religious Studies",
          location: "Leyton",
          price: 35,
          spaces: 3,
          image: rsIcon,
        },
        {
          id: 10,
          subject: "French",
          location: "Burnt Oak",
          price: 30,
          spaces: 4,
          image: frenchIcon,
        },
      ],
      cart: [],
      orders: [],
      sortBy: "subject",
      sortOrder: "asc",
      searchTerm: "",
      // Controls visability of the orders section
      showOrders: false,
      // Enables confirmation message
      confirmationMessage: "",
      nameError: "",
      phoneError: "",
    };
  },
  computed: {
    sortedLessons() {
      const filtered = this.lessons.filter((lesson) => {
        const term = this.searchTerm.toLowerCase().trim();

        // Allows searching by spaces
        if (term.startsWith("spaces:")) {
          const num = Number(term.split(":")[1]);
          return lesson.spaces <= num;
        }

        // If it's a number, treat as max price
        if (!isNaN(term) && term !== "") {
          return lesson.price <= Number(term);
        }

        // Otherwise search by subject or location
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

    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },
  },
  methods: {
    updateSort({ field, order }) {
      this.sortBy = field;
      this.sortOrder = order;
    },

    //Name field validation
    validateName(name) {
      const namePattern = /^[A-Za-z\s'-]{2,50}$/;
      if (!name || !name.trim()) {
        this.nameError = "Name is required.";
        return false;
      } else if (!namePattern.test(name)) {
        this.nameError =
          "Please enter a valid name (letters only, 2-50 characters).";
        return false;
      } else {
        this.nameError = "";
        return true;
      }
    },
    // Phone number field validation
    validatePhone(phone) {
      const phonePattern = /^07\d{9}$/;
      if (!phone || !phone.trim()) {
        this.phoneError = "Phone number is required.";
        return false;
      } else if (!phonePattern.test(phone)) {
        this.phoneError = "Please enter a valid UK mobile number.";
        return false;
      } else {
        this.phoneError = "";
        return true;
      }
    },

    // Allows multiple adds until spaces = 0
    addToCart(lesson) {
      if (lesson.spaces > 0) {
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

    // Clear the entire cart
    clearCart() {
      // Restore spaces for all lessons in the cart
      this.cart.forEach((item) => {
        const match = this.lessons.find((lesson) => lesson.id === item.id);
        if (match) match.spaces++;
      });
      // Empty the cart
      this.cart = [];
    },

    // Stores all the orders
    async handleCheckout(details) {
      // Run validation first
      const validName = this.validateName(details.name);
      const validPhone = this.validatePhone(details.phone);

      if (!validName || !validPhone) {
        return; // Stop if validation fails
      }

      // Create order object
      const order = {
        name: details.name,
        phone: details.phone,
        items: this.cart.map(item => ({
          id: item.id,
          subject: item.subject,
          location: item.location,
          price: item.price
        })),
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        total: this.cart.reduce((sum, item) => sum + item.price, 0),
        status: "pending",
      };
      
      try {
        // Save to database via API
        const savedOrder = await createOrder(order);
        
        // Add to local orders list
        this.orders.push(savedOrder);

        // Restore all spaces and clear cart on checkout
        this.cart.forEach((item) => {
          const match = this.lessons.find((lesson) => lesson.id === item.id);
          if (match) match.spaces++;
        });
        this.cart = [];
        
        // Show confirmation message
        this.confirmationMessage = `Order placed successfully for ${details.name} (${details.phone})`;
        
        // Switch to orders page
        this.currentView = "orders";

        // Auto-hide after 3 seconds
        setTimeout(() => {
          this.confirmationMessage = "";
        }, 3000);
      } catch (error) {
        console.error("Checkout failed:", error);
        alert("Failed to place order. Please try again.");
      }
    },
  },
  
  async mounted() {
    try {
      // Fetch existing orders from database
      const res = await fetch("http://localhost:5000/orders");
      if (res.ok) {
        this.orders = await res.json();
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  },
};
</script>

<style>
/* Cart count styling added */
.cart-count {
  font-size: 0.8em;
  color: #0078d4;
}
</style>
