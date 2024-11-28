<template>
  <div class="my-profile">
    <!-- Profile Header -->
    <div class="container">
      <h1>My Profile</h1>
      <div v-if="userName">
        <div class="profile-info">
          <div class="profile-item">
            <label>Full Name</label>
            <p>{{ userName.full_name }}</p>
          </div>
          <div class="profile-item">
            <label>Email</label>
            <p>{{ userName.email }}</p>
          </div>
          <div class="profile-item">
            <label>Phone Number</label>
            <p>{{ userName.phone }}</p>
          </div>
        </div>
        <button @click="editProfile" class="btn btn-primary">Edit Profile</button>
      </div>
      <div v-else>
        <p>Please log in to view and edit your profile.</p>
        <router-link to="/login" class="btn btn-primary">Login</router-link>
      </div>
    </div>

    <!-- Order History -->
    <div v-if="userOrders.length" class="order-history">
      <h2>Order History</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in userOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.status }}</td>
            <td>{{ formatCurrency(order.total) }}</td>
            <td>
              <router-link :to="`/OrderDetails/${order.id}`" class="btn btn-info">View Details</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>You have no orders yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProfile',
  data() {
    return {
      userName: JSON.parse(sessionStorage.getItem('userName')) || null,
      userOrders: [],
    };
  },
  created() {
    if (this.userName) {
      this.fetchUserOrders();
    }
  },
  methods: {
    fetchUserOrders() {
      this.userOrders = [
        { id: 101, date: '2024-11-15', status: 'Shipped', total: 120.00 },
        { id: 102, date: '2024-11-10', status: 'Delivered', total: 50.00 },
        { id: 103, date: '2024-10-25', status: 'Processing', total: 75.00 },
      ];
    },
    editProfile() {
      this.$router.push('/edit-profile');
    },
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
.my-profile {
  padding: 20px;
}
.profile-info {
  margin-bottom: 20px;
}
.profile-item {
  margin-bottom: 10px;
}
.profile-item label {
  font-weight: bold;
}
.profile-item p {
  margin: 0;
}
.btn {
  margin-top: 10px;
}
.order-history {
  margin-top: 30px;
}
.table th, .table td {
  text-align: center;
}
.table td {
  vertical-align: middle;
}
</style>
