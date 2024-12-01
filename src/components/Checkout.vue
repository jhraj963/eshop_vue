<template>
  <div class="checkout-page">
    <div class="container-fluid">
      <div class="row">
        <!-- Left Section: Shipping and Donation -->
        <div class="col-lg-6">
          <h2>Checkout</h2>
          <div v-if="!uid">
            <p>Please <a href="/login">login</a> to place an order.</p>
          </div>
          <div v-else>
            <form @submit.prevent="submitCheckout">
              <h3>Shipping Information</h3>
              <!-- Shipping form fields -->
              <div class="form-group">
                <label for="customer_name">Full Name:</label>
                <input type="text" id="customer_name" v-model="shippingInfo.customer_name" required class="form-control"
                  placeholder="Your full name">
              </div>
              <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" v-model="shippingInfo.email" required class="form-control"
                  placeholder="Your email address">
              </div>
              <div class="form-group">
                <label for="phone">Phone Number:</label>
                <input type="text" id="phone" v-model="shippingInfo.mobile_no" required class="form-control"
                  placeholder="Your phone number">
              </div>
              <div class="form-group">
                <label for="address">Shipping Address:</label>
                <input type="text" id="address" v-model="shippingInfo.address" required class="form-control"
                  placeholder="Your address">
              </div>
              <div class="form-group">
                <label for="country">Country:</label>
                <input type="text" id="country" v-model="shippingInfo.country" required class="form-control"
                  placeholder="Your country">
              </div>
              <div class="form-group">
                <label for="city">City:</label>
                <input type="text" id="city" v-model="shippingInfo.city" required class="form-control"
                  placeholder="Your city">
              </div>

              <!-- Support a Cause -->
              <h3 class="donation-title">Support a Cause</h3>
              <div class="donation-section">
                <p class="donation-description">
                  Join us in making a difference! Add a small donation to your order to support a cause.
                </p>
                <div class="donation-options">
                  <label class="donation-option">
                    <input type="radio" v-model="donationAmount" value="0" />
                    <span>No, thanks</span>
                  </label>
                  <label class="donation-option">
                    <input type="radio" v-model="donationAmount" value="50" />
                    <span>৳50</span>
                  </label>
                  <label class="donation-option">
                    <input type="radio" v-model="donationAmount" value="100" />
                    <span>৳100</span>
                  </label>
                  <label class="donation-option">
                    <input type="radio" v-model="donationAmount" value="200" />
                    <span>৳200</span>
                  </label>
                  <label class="donation-option">
                    <input type="radio" v-model="donationAmount" value="custom" />
                    <span>Custom</span>
                  </label>
                </div>
                <div v-if="donationAmount === 'custom'" class="custom-donation-input">
                  <input type="number" v-model.number="customDonation" min="0" class="form-control"
                    placeholder="Enter custom amount" />
                </div>
              </div>

              <!-- Total and Place Order -->
              <div class="cart-summary">
                <h4>Total: ৳{{ totalWithDonation }}</h4>
                <button type="submit" class="btn btn-success">Place Order</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Right Section: Order Summary -->
        <div class="col-lg-6">
          <h3>Order Summary</h3>
          <div v-if="cart.length === 0">
            <p>Your cart is empty.</p>
          </div>
          <div v-else>
            <div v-for="item in cart" :key="item.id" class="cart-item">
              <div class="cart-item-image">
                <img :src="`http://127.0.0.1:8000/addproduct/${item.photo}`" alt="Product Image">
              </div>
              <div class="cart-item-details">
                <h4>{{ item.productname }}</h4>
                <p>৳{{ item.price }} x {{ item.quantity }}</p>
              </div>
            </div>
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
      uid: sessionStorage.getItem("uid"),
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      shippingInfo: {
        customer_name: "",
        email: "",
        mobile_no: "",
        address: "",
        country: "",
        city: "",
        order_date: new Date().toISOString().slice(0, 10),
      },
      donationAmount: "0",
      customDonation: 0,
    };
  },
  computed: {
    totalAmount() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    totalWithDonation() {
      const donation = this.donationAmount === "custom" ? this.customDonation : Number(this.donationAmount);
      return this.totalAmount + donation;
    },
  },
  methods: {
    submitCheckout() {
      const donation = this.donationAmount === "custom" ? this.customDonation : Number(this.donationAmount);

      const orderData = {
        user_id: this.uid,
        shipping_info: this.shippingInfo,
        cart_items: this.cart,
        total_amount: this.totalAmount,
        donation_amount: donation,
      };

      DataService.placeOrder(orderData)
        .then((response) => {
          if (response.data.success) {
            alert("Order placed successfully!");
            localStorage.removeItem("cart");
            this.$router.push({ name: "ThankYou", params: { orderDetails: response.data.order } });
          } else {
            alert("There was an error placing your order. Please try again.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error placing your order. Please try again.");
        });
    },
  },
};
</script>

<style scoped>
/* Adjusted Product Image Size */
.cart-item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
}

/* Other Styles */
.checkout-page {
  padding: 50px;
}

.row {
  display: flex;
  gap: 20px;
}

.col-lg-6 {
  flex: 1;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
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

.cart-summary .btn {
  padding: 10px 20px;
  font-size: 18px;
}

.btn-success {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }
}
</style>
