<template>
  <section class="orders-page">
    <!-- Page heading -->
    <h2>Your orders</h2>

    <!-- Confirmation message -->
     <p v-if="$parent.confirmationMessage" class="confirmation">
        {{ $parent.confirmationMessage }}
     </p>
<!-- Message shown when no orders have been placed -->
    <div v-if="orders.length === 0" class="empty-orders">
      <p>You haven't placed any orders yet.</p>
    </div>

    <div v-else>
      <table class="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total (£)</th>
            <th>Status</th>
            <th>Lessons</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ order.name }}</td>
            <td>{{ order.phone }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.timestamp }}</td>
            <td>{{ order.total }}</td>
            <td>
              <span :class="order.status">{{ order.status }}</span>
            </td>
            <td>
              <ul>
                <li v-for="item in order.items" :key="item.id">
                  {{ item.subject }} - {{ item.location }} (£{{ item.price }})
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: "Orders",
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedOrder: null,
    };
  },
  methods: {
    viewOrderDetails(index) {
      this.selectedOrder = this.selectedOrder === index ? null : index;
    },
  },
};
</script>

<style scoped>
.orders-page {
  padding: 20px;
}

.empty-orders {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  margin-top: 40px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.orders-table th,
.orders-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
}

.orders-table th {
  background-color: #f0f0f0;
}

.orders-table ul {
  padding-left: 16px;
  margin: 0;
}

.pending {
  color: orange;
  font-weight: bold;
}

.confirmed {
  color: green;
  font-weight: bold;
}

.completed {
  color: gray;
  font-weight: bold;
}

.confirmation {
    background-color: #e6ffed;
    border: 1px solid #2ecc71;
    color: #3e7d32;
    padding: 12px;
    margin: 15px 0;
    border-radius: 6px;
    font-weight: bold;
    text-align: center;
    transition: opicaty 0.5s ease;
}
</style>