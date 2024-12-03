<template>
  <!-- Product List Start -->
  <div class="product-view">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <!-- Sort by Price Button Group -->
          <div class="sort-options">
            <span>Sort by Price:</span>
            <div class="btn-group">
              <button class="btn" :class="{ active: selectedFilter === 'lowToHigh' }"
                @click="setSortOrder('lowToHigh')">
                Low to High
              </button>
              <button class="btn" :class="{ active: selectedFilter === 'highToLow' }"
                @click="setSortOrder('highToLow')">
                High to Low
              </button>
            </div>
          </div>
          <div class="row">
            <!-- Product Listing -->
            <div class="col-md-3" v-for="product in filteredProducts" :key="product.id">
              <div class="product-item">
                <div class="product-title">
                  <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
                    {{ product.productname }}
                  </router-link>
                  <div class="ratting">
                    <i class="fa fa-star" v-for="i in 5" :key="i" :class="{ 'active': i <= product.rating }"></i>
                  </div>
                </div>
                <div class="product-image">
                  <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
                    <img :src='"http://127.0.0.1:8000/addproduct/" + product.photo' alt="package-place" />
                  </router-link>
                  <div class="product-action">
                    <a href="#" @click.prevent="addToCart(product)"><i class="fa fa-cart-plus"></i></a>
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
  name: "AllProducts",
  data() {
    return {
      addproduct: [], // Store products fetched from the backend
      cart: JSON.parse(localStorage.getItem("cart")) || [], // Cart items
      wishlist: JSON.parse(localStorage.getItem("wishlist")) || [], // Wishlist items
      selectedFilter: "default", // Selected filter for sorting
    };
  },
  computed: {
    // Dynamically filter and sort products based on the selected option
    filteredProducts() {
      if (this.selectedFilter === "lowToHigh") {
        return [...this.addproduct].sort((a, b) => a.price - b.price);
      } else if (this.selectedFilter === "highToLow") {
        return [...this.addproduct].sort((a, b) => b.price - a.price);
      }
      return this.addproduct; // Default sorting
    },
  },
  methods: {
    // Fetch all products from the backend
    allproducts() {
      const uid = sessionStorage.getItem("uid");
      DataService.addproduct(uid)
        .then((response) => {
          if (response.data.data) {
            this.addproduct = response.data.data; // Set product data
          } else {
            alert(response.data.error);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    // Add a product to the cart
    addToCart(product) {
      const existingProductIndex = this.cart.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        this.cart[existingProductIndex].quantity += 1; // Increase quantity if already in cart
      } else {
        this.cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
      }

      // Sync the updated cart with localStorage
      localStorage.setItem("cart", JSON.stringify(this.cart));
      window.dispatchEvent(new Event("storage")); // Notify other components
    },
    // Add a product to the wishlist
    addToWishlist(product) {
      const existingProductIndex = this.wishlist.findIndex((item) => item.id === product.id);

      if (existingProductIndex === -1) {
        this.wishlist.push(product); // Add product to wishlist if not already there
      }

      // Sync the updated wishlist with localStorage
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
      window.dispatchEvent(new Event("storage")); // Notify other components
    },
    // Set sorting order
    setSortOrder(order) {
      this.selectedFilter = order;
    },
  },
  mounted() {
    this.allproducts(); // Fetch products when component is mounted
    window.addEventListener("storage", () => {
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    });
  },
};
</script>

<!-- <style scoped>
.product-view {
  padding: 20px;
}

.sort-options {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.sort-options span {
  font-weight: bold;
  margin-right: 10px;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.btn-group .btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-group .btn:hover {
  background-color: #007bff;
  color: white;
}

.btn-group .btn.active {
  background-color: #007bff;
  color: white;
}

.product-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
}

.product-image img {
  max-width: 100%;
  height: auto;
}

.product-action a {
  margin: 0 5px;
  cursor: pointer;
}

.product-price h3 {
  margin: 15px 0;
  color: #333;
}

.btn {
  background-color: #007bff;
  color: rgb(5, 0, 0);
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
}
</style> -->


<style scoped>
.product-view {
  padding: 10px; /* Reduced padding for the main container */
}

.sort-options {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Reduced bottom margin */
}

.sort-options span {
  font-weight: bold;
  font-size: 14px; /* Smaller font size */
  margin-right: 10px;
}

.btn-group {
  display: flex;
  gap: 5px; /* Reduced gap between buttons */
}

.btn-group .btn {
  padding: 6px 10px; /* Smaller padding for buttons */
  font-size: 12px; /* Smaller font size */
  border: 1px solid #ddd;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-group .btn:hover {
  background-color: #007bff;
  color: white;
}

.btn-group .btn.active {
  background-color: #007bff;
  color: white;
}

.product-item {
  border: 1px solid #ddd;
  padding: 10px; /* Reduced padding inside product item */
  margin-bottom: 15px; /* Reduced margin between products */
  text-align: center;
  font-size: 14px; /* Smaller font size for product details */
  background-color: #f9f9f9; /* Light background for better visibility */
  border-radius: 8px; /* Rounded corners for a modern look */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

.product-title {
  font-size: 14px; /* Reduced font size for title */
  margin-bottom: 5px; /* Adjust spacing */
}

.product-image {
  position: relative;
  overflow: hidden; /* Ensures image fits within its container */
  border-radius: 6px; /* Rounded corners for the image */
}

.product-image img {
  max-width: 100%;
  height: auto; /* Maintain aspect ratio */
  display: block; /* Avoid inline-block gaps */
  transition: transform 0.3s ease; /* Smooth zoom effect */
}

.product-image:hover img {
  transform: scale(1.1); /* Zoom-in effect on hover */
}

.product-action {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 5px; /* Small gap between icons */
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  padding: 5px;
  border-radius: 0 6px 0 6px; /* Rounded corners for the action container */
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.product-image:hover .product-action {
  transform: translateX(0); /* Slide in icons on hover */
}

.product-action a {
  margin: 0;
  color: white;
  font-size: 12px; /* Smaller icon size */
}

.product-price h3 {
  margin: 10px 0; /* Reduce spacing around price */
  font-size: 16px; /* Slightly smaller font size for price */
  color: #f9f5f5;
}

.btn {
  background-color: #007bff;
  color: rgb(4, 0, 0);
  padding: 6px 10px; /* Reduced padding for buttons */
  font-size: 12px; /* Smaller font size */
  border-radius: 4px;
  text-decoration: none;
}

.ratting i {
  font-size: 12px; /* Smaller star icons */
}

.container-fluid {
  max-width: 1500px; /* Constrain the overall width */
  margin: 0 auto;
}

.col-md-3 {
  padding: 5px; /* Reduce padding between columns */
}
</style>
