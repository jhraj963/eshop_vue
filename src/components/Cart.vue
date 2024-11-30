<template>
  <div class="cart-page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <h2>Your Cart</h2>
          <div v-if="cart.length === 0">
            <p>Your cart is empty.</p>
            <a href="/AllProducts" class="btn btn-primary">Shop Now</a>
          </div>
          <div v-else>
            <div v-for="item in cart" :key="item.id" class="cart-item">
              <div class="cart-item-image">
                <img :src="item.photo" alt="Product Image">
              </div>
              <div class="cart-item-details">
                <h4>{{ item.productname }}</h4>
                <p>৳{{ item.price }}</p>
                <div class="quantity">
                  <button @click="decreaseQuantity(item)" class="btn">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)" class="btn">+</button>
                </div>
                <button @click="removeItem(item)" class="btn btn-danger">Remove</button>
              </div>
            </div>
            <div class="cart-summary">
              <h3>Total: ৳{{ totalAmount }}</h3>
              <a href="/Checkout" class="btn btn-success">Proceed to Checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    };
  },
  computed: {
    // Calculate total amount in the cart
    totalAmount() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    // Decrease quantity of a product in the cart
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeItem(item); // If quantity is 1, remove item
      }
      this.updateCart();
    },

    // Increase quantity of a product in the cart
    increaseQuantity(item) {
      item.quantity += 1;
      this.updateCart();
    },

    // Remove an item from the cart
    removeItem(item) {
      this.cart = this.cart.filter(cartItem => cartItem.id !== item.id); // Remove item by its id
      this.updateCart();
    },

    // Update cart in localStorage
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
  },
  mounted() {
    // Sync cart from localStorage
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  },
};
</script>

<style scoped>
.cart-page {
  padding: 50px;
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

.cart-item-details h4 {
  margin: 0;
}

.cart-item-details .quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item-details .btn {
  cursor: pointer;
}

.cart-summary {
  text-align: right;
  margin-top: 30px;
}

.cart-summary h3 {
  margin-bottom: 20px;
}
</style>
