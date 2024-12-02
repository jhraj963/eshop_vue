<template>
  <div class="my-orders">
    <!-- Page Title -->
    <div class="container">
      <h1 class="page-title">My Orders</h1>

      <!-- If customer is logged in, show their orders -->
      <div v-if="orders.length > 0" class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-header">
            <h3>Order #{{ order.id }}</h3>
            <!-- <p><strong>Status:</strong> {{ order.status }}</p> -->
            <p><strong>Total:</strong> ${{ order.total_amount }}</p>
            <p><strong>Order Date:</strong> {{ order.order_date }}</p>
          </div>
          <router-link :to="'/allorder/' + order.id" class="btn btn-primary">View Details</router-link>
        </div>
      </div>

      <!-- If no orders, show a message -->
      <div v-else>
        <p>No orders found. Please make a purchase to see your orders.</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "MyOrders",
  data() {
    return {
      customer_id: JSON.parse(sessionStorage.getItem("userId")), // Get customer ID from sessionStorage
      orders: [], // Make sure the orders array is initialized correctly
    };
  },
  methods: {
    async fetchOrders() {
      try {
        // Fetch orders for the logged-in customer
        const response = await DataService.getOrdersByCustomer(this.customer_id);
        
        // Check if the response is in the expected format and update the orders array
        if (response.data && Array.isArray(response.data)) {
          this.orders = response.data; // Directly assign the orders if they are in the response.data array
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("There was an error fetching the orders:", error);
      }
    },
  },
  mounted() {
    if (this.customer_id) {
      this.fetchOrders(); // Fetch orders when the component is mounted
    }
  },
};
</script>

<style scoped>
.my-orders {
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order-header {
  margin-bottom: 15px;
}

.order-card h3 {
  font-size: 1.5rem;
}

.order-card p {
  font-size: 1.1rem;
  color: #666;
}

.btn {
  background-color: #05b347;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

</style>
