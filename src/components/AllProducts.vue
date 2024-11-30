<template>
  <!-- Product List Start -->
  <div class="product-view">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <!--Product Listing -->
            <div class="col-md-3" v-for="product in addproduct" :key="product.id">
              <div class="product-item">
                <div class="product-title">
                  <!-- Updated link to use Vue Router navigation -->
                  <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
                    {{ product.productname }}
                  </router-link>
                  <div class="ratting">
                    <i class="fa fa-star" v-for="i in 5" :key="i" :class="{ 'active': i <= product.rating }">
                    </i>
                  </div>
                </div>
                <div class="product-image">
                  <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
                    <img :src='"http://127.0.0.1:8000/addproduct/" + product.photo' alt="package-place" />
                  </router-link>
                  <div class="product-action">
                    <!-- Add to Cart button, triggers addToCart method -->
                    <a href="#" @click.prevent="addToCart(product)"><i class="fa fa-cart-plus"></i></a>
                    <!-- Add to Wishlist button, triggers addToWishlist method -->
                    <a href="#" @click.prevent="addToWishlist(product)"><i class="fa fa-heart"></i></a>
                    <a href="#"><i class="fa fa-search"></i></a>
                  </div>
                </div>
                <div class="product-price">
                  <h3><span>৳</span>{{ product.price }}</h3>
                  <a class="btn" href="">
                    <i class="fa fa-shopping-cart"></i>Buy Now
                  </a>
                </div>
              </div>
            </div>
            <!-- End Product Listing -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Product List End -->
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: 'AllProducts',
  data() {
    return {
      addproduct: [], // To store products dynamically fetched from the backend
      cart: JSON.parse(localStorage.getItem('cart')) || [], // Store cart items in reactive data
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [] // Store wishlist items
    };
  },
  computed: {
    // Calculate the total cart count
    cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    // Calculate the total wishlist count
    wishlistCount() {
      return this.wishlist.length;
    }
  },
  methods: {
    // Method to fetch products from the backend
    allproducts() {
      let uid = sessionStorage.getItem('uid');
      DataService.addproduct(uid)
        .then(response => {
          if (response.data.data) {
            this.addproduct = response.data.data; // Set product data to be displayed
          } else {
            alert(response.data.error);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Method to add product to cart
    addToCart(product) {
      const existingProductIndex = this.cart.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {
        // If the product is already in the cart, increase the quantity
        this.cart[existingProductIndex].quantity += 1;
      } else {
        // If the product is not in the cart, add it with quantity 1
        this.cart.push({ ...product, quantity: 1 });
      }

      // Sync the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(this.cart));

      // Emit an event to notify other components that cart has been updated
      window.dispatchEvent(new Event("storage"));
    },

    // Method to add product to wishlist
    addToWishlist(product) {
      const existingProductIndex = this.wishlist.findIndex(item => item.id === product.id);

      if (existingProductIndex === -1) {
        // If the product is not in the wishlist, add it
        this.wishlist.push(product);
      }

      // Sync the updated wishlist to localStorage
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

      // Emit an event to notify other components that wishlist has been updated
      window.dispatchEvent(new Event("storage"));
    }
  },
  mounted() {
    this.allproducts(); // Fetch products when the component is mounted

    // Listen for localStorage changes (such as cart or wishlist updates)
    window.addEventListener("storage", () => {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    });
  }
};
</script>