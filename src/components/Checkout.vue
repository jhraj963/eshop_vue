<template>
  <div class="checkout-page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8">
          <h2>Checkout</h2>

          <!-- Display a message if the user is not logged in -->
          <div v-if="!uid">
            <p>Please <a href="/login">login</a> to place an order.</p>
          </div>

          <!-- If logged in, show the checkout form -->
          <div v-else>
            <form @submit.prevent="submitCheckout">
              <h3>Shipping Information</h3>
              <div class="form-group">
                <label for="customer_name">Full Name:</label>
                <input type="text" id="customer_name" v-model="shippingInfo.customer_name" required class="form-control" placeholder="Your full name">
              </div>
              <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" v-model="shippingInfo.email" required class="form-control" placeholder="Your email address">
              </div>
              <div class="form-group">
                <label for="phone">Phone Number:</label>
                <input type="text" id="phone" v-model="shippingInfo.mobile_no" required class="form-control" placeholder="Your phone number">
              </div>
              <div class="form-group">
                <label for="address">Shipping Address:</label>
                <input type="text" id="address" v-model="shippingInfo.address" required class="form-control" placeholder="Your address">
              </div>
              <div class="form-group">
                <label for="country">Country:</label>
                <input type="text" id="country" v-model="shippingInfo.country" required class="form-control" placeholder="Your country">
              </div>
              <div class="form-group">
                <label for="city">City:</label>
                <input type="text" id="city" v-model="shippingInfo.city" required class="form-control" placeholder="Your city">
              </div>

              <h3>Order Summary</h3>
              <div v-if="cart.length === 0">
                <p>Your cart is empty.</p>
              </div>
              <div v-else>
                <div v-for="item in cart" :key="item.id" class="cart-item">
                  <div class="cart-item-image">
                    <img :src="item.photo" alt="Product Image">
                  </div>
                  <div class="cart-item-details">
                    <h4>{{ item.productname }}</h4>
                    <p>৳{{ item.price }} x {{ item.quantity }}</p>
                  </div>
                </div>
                <div class="cart-summary">
                  <h4>Total: ৳{{ totalAmount }}</h4>
                </div>
              </div>

              <button type="submit" class="btn btn-success">Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "Checkout",
  data() {
    return {
      uid: sessionStorage.getItem("uid"), // Check if the user is logged in
      cart: JSON.parse(localStorage.getItem("cart")) || [], // Get cart from localStorage
      shippingInfo: {
        customer_name: "",
        email: "",
        mobile_no: "",
        address: "",
        country: "",
        city: "",
        order_date: new Date().toISOString().slice(0, 10), // Default to today's date
      },
    };
  },
  computed: {
    // Calculate total amount from cart
    totalAmount() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    // Submit the checkout information and create the order
    submitCheckout() {
      if (!this.uid) {
        alert("Please login to place an order.");
        return;
      }

      const orderData = {
        user_id: this.uid, // User ID
        shipping_info: this.shippingInfo, // Shipping information
        cart_items: this.cart, // Cart items
        total_amount: this.totalAmount, // Total order amount
      };

      // Call the API to create the order
      DataService.placeOrder(orderData)
        .then((response) => {
          if (response.data.success) {
            alert("Order placed successfully!");
            localStorage.removeItem("cart"); // Clear the cart after successful order
            // Pass the order data to the ThankYou page and redirect
            this.$router.push({ name: "ThankYou", params: { orderDetails: response.data.order } });
          } else {
            alert("There was an error placing your order. Please try again later.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error placing your order. Please try again later.");
        });
    },
  },
};
</script>

<style scoped>
.checkout-page {
  padding: 50px;
}

.checkout-page form {
  width: 100%;
}

.checkout-page .form-group {
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.cart-item-image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
}

.cart-item-details {
  flex: 1;
}

.cart-summary {
  text-align: right;
  margin-top: 30px;
}

.cart-summary h4 {
  margin-bottom: 20px;
}

.btn {
  margin-top: 20px;
}
</style>
