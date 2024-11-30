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
          <div v-else>
            <div v-for="(item, index) in wishlist" :key="item.id" class="wishlist-item">
              <div class="wishlist-item-image">
                <img :src="item.photo" alt="Product Image">
              </div>
              <div class="wishlist-item-details">
                <h4>{{ item.productname }}</h4>
                <p>৳{{ item.price }}</p>
                <button @click="removeFromWishlist(index)" class="btn btn-danger">Remove</button>
                <button @click="moveToCart(item)" class="btn btn-success">Move to Cart</button>
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

.wishlist-item {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.wishlist-item-image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
}

.wishlist-item-details {
  flex: 1;
}

.wishlist-item-details h4 {
  margin: 0;
}

.wishlist-item-details .btn {
  cursor: pointer;
  margin-right: 10px;
}
</style>
