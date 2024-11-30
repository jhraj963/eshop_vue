<template>
  <div class="wishlist-page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <h2>Your Wishlist</h2>
          <div v-if="wishlist.length === 0">
            <p>Your wishlist is empty.</p>
            <a href="/AllProducts" class="btn btn-primary">Shop Now</a>
          </div>
          <div v-else class="wishlist-items-container">
            <!-- Display each wishlist item in a grid -->
            <div v-for="(item, index) in wishlist" :key="item.id" class="wishlist-item">
              <div class="wishlist-item-image">
                <img :src="`http://127.0.0.1:8000/addproduct/${item.photo}`" alt="Product Image" />
              </div>
              <div class="wishlist-item-details">
                <h4>{{ item.productname }}</h4>
                <p class="price">৳{{ item.price }}</p>
                <div class="wishlist-actions">
                  <button @click="removeFromWishlist(index)" class="btn btn-danger">
                    <i class="fa fa-trash"></i> Remove
                  </button>
                  <button @click="moveToCart(item)" class="btn btn-success">
                    <i class="fa fa-cart-plus"></i> Move to Cart
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
  name: 'Wishlist',
  data() {
    return {
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    };
  },
  methods: {
    // Remove item from the wishlist
    removeFromWishlist(index) {
      this.wishlist.splice(index, 1);
      this.updateWishlist();
    },

    // Move item from wishlist to cart
    moveToCart(item) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find((product) => product.id === item.id);

      if (!existingProduct) {
        cart.push({ ...item, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      // Remove item from wishlist after moving to cart
      this.removeFromWishlist(this.wishlist.indexOf(item));
    },

    // Update wishlist in localStorage
    updateWishlist() {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    },
  },
  mounted() {
    // Sync wishlist from localStorage
    this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  },
};
</script>

<style scoped>
.wishlist-page {
  padding: 50px;
}

.wishlist-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.wishlist-item {
  width: calc(33.333% - 20px);
  /* 3 items per row */
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.wishlist-item-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.wishlist-item-details {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.wishlist-item-details h4 {
  font-size: 18px;
  margin: 10px 0;
  font-weight: bold;
}

.wishlist-item-details .price {
  font-size: 16px;
  color: #333;
}

.wishlist-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.wishlist-actions .btn {
  flex-grow: 1;
  margin-left: 5px;
}

.wishlist-actions .btn i {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .wishlist-item {
    width: calc(50% - 20px);
    /* 2 items per row on smaller screens */
  }
}

@media (max-width: 480px) {
  .wishlist-item {
    width: 100%;
    /* 1 item per row on mobile screens */
  }
}
</style>
