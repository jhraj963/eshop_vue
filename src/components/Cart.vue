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
            <!-- Cart Summary in Top Left (Inside the component) -->
            <div class="cart-summary">
              <h3>Total: ৳{{ totalAmount }}</h3>
              <a href="/Checkout" class="btn btn-success">Proceed to Checkout</a>
            </div>
            <!-- Display Cart Items -->
            <div class="cart-items">
              <div v-for="item in cart" :key="item.id" class="cart-item">
                <div class="cart-item-image">
                  <img :src="`http://127.0.0.1:8000/addproduct/${item.photo}`" alt="Product Image" />
                </div>
                <div class="cart-item-details">
                  <h4>{{ item.productname }}</h4>
                  <p class="price">৳{{ item.price }}</p>
                  <div class="quantity">
                    <button @click="decreaseQuantity(item)" class="btn btn-quantity">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item)" class="btn btn-quantity">+</button>
                  </div>
                  <button @click="removeItem(item)" class="btn btn-danger">
                    <i class="fa fa-trash"></i> Remove
                  </button>
                </div>
              </div>
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

.cart-summary {
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.cart-summary h3 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
}

.cart-summary .btn {
  padding: 10px 20px;
  font-size: 18px;
}

.cart-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* 4 items per row */
  gap: 20px;
}

.cart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.cart-item:hover {
  transform: scale(1.05);
}

.cart-item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 10px;
}

.cart-item-details {
  text-align: center;
}

.cart-item-details h4 {
  font-size: 14px;
  margin: 5px 0;
  font-weight: bold;
}

.cart-item-details .price {
  font-size: 12px;
  color: #333;
}

.cart-item-details .quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.cart-item-details .btn {
  cursor: pointer;
  font-size: 14px;
}

.cart-item-details .btn-quantity {
  width: 30px;
  height: 30px;
  font-size: 18px;
  padding: 0;
}

@media (max-width: 768px) {
  .cart-items {
    grid-template-columns: repeat(2, 1fr);
    /* 2 items per row on smaller screens */
  }
}

@media (max-width: 480px) {
  .cart-items {
    grid-template-columns: 1fr;
    /* 1 item per row on very small screens */
  }
}
</style>
