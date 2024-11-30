<template>
  <div class="invoice-page">
    <div class="container">
      <h2>Invoice</h2>
      <div v-if="orderDetails">
        <div class="invoice-header">
          <p><strong>Invoice #</strong> {{ orderDetails.id }}</p>
          <p><strong>Order Date:</strong> {{ orderDetails.order_date }}</p>
        </div>

        <div class="invoice-shipping-info">
          <h4>Shipping Information</h4>
          <p><strong>Name:</strong> {{ orderDetails.shipping_info.customer_name }}</p>
          <p><strong>Email:</strong> {{ orderDetails.shipping_info.email }}</p>
          <p><strong>Phone:</strong> {{ orderDetails.shipping_info.mobile_no }}</p>
          <p><strong>Address:</strong> {{ orderDetails.shipping_info.address }}</p>
          <p><strong>Country:</strong> {{ orderDetails.shipping_info.country }}</p>
          <p><strong>City:</strong> {{ orderDetails.shipping_info.city }}</p>
        </div>

        <div class="invoice-items">
          <h4>Order Items</h4>
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orderDetails.cart_items" :key="item.id">
                <td>{{ item.productname }}</td>
                <td>৳{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>৳{{ item.price * item.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="invoice-total">
          <h4>Total Amount: ৳{{ orderDetails.total_amount }}</h4>
        </div>

        <button @click="downloadPDF" class="btn btn-primary">Download PDF Invoice</button>
      </div>
      <div v-else>
        <p>Loading invoice...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService"; // Make sure to import your data service

export default {
  name: "Invoice",
  data() {
    return {
      orderId: this.$route.query.orderId || "",
      orderDetails: null,
    };
  },
  mounted() {
    if (this.orderId) {
      this.fetchOrderDetails();
    } else {
      alert("Order ID is missing.");
    }
  },
  methods: {
    // Fetch order details from the backend based on order ID
    fetchOrderDetails() {
      DataService.getOrderDetails(this.orderId)
        .then((response) => {
          if (response.data.success) {
            this.orderDetails = response.data.order;
          } else {
            alert("Order details not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
          alert("There was an issue fetching the order details. Please try again later.");
        });
    },
    // Generate PDF of the invoice (This is a placeholder for actual implementation)
    downloadPDF() {
      if (this.orderDetails) {
        // Logic to generate and download PDF
        alert("PDF Invoice generation not implemented yet.");
      } else {
        alert("Order details not available.");
      }
    },
  },
};
</script>

<style scoped>
.invoice-page {
  padding: 50px;
}

.invoice-header,
.invoice-shipping-info,
.invoice-items,
.invoice-total {
  margin-bottom: 30px;
}

.invoice-items table {
  width: 100%;
  border-collapse: collapse;
}

.invoice-items th,
.invoice-items td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
