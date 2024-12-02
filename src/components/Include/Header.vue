<template>
  <!-- Top bar Start -->
  <div class="top-bar">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <i class="fa fa-envelope"></i> e-shopper@gmail.com
        </div>
        <div class="col-sm-6">
          <i class="fa fa-phone-alt"></i> +88 01572 378254
        </div>
      </div>
    </div>
  </div>
  <!-- Top bar End -->

  <!-- Nav Bar Start -->
  <div class="nav">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <a href="#" class="navbar-brand">MENU</a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div class="navbar-nav mr-auto">
            <a href="/" class="nav-item nav-link active">Home</a>
            <a href="/AllProducts" class="nav-item nav-link">All Products</a>
            <a href="my-account.html" class="nav-item nav-link">My Account</a>
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">More Pages</a>
              <div class="dropdown-menu">
                <a href="wishlist.html" class="dropdown-item">Wishlist</a>
                <a href="login.html" class="dropdown-item">Login & Register</a>
                <a href="contact.html" class="dropdown-item">Contact Us</a>
              </div>
            </div>
            <a href="/Faq" class="nav-item nav-link">FAQ</a>
            <a href="/BlogPage" class="nav-item nav-link">Blog</a>
          </div>
          <div class="navbar-nav ml-auto">
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle d-flex align-items-center" data-toggle="dropdown">
                <!-- Profile Image -->
                <img v-if="uid && userName.photo" :src='"http://127.0.0.1:8000/customers/" + userName.photo'
                  alt="profile" class="profile-img rounded-circle mr-2" />
                <!-- Display the user's full name if logged in, otherwise show 'User Account' -->
                {{ uid ? userName.full_name : 'User Account' }}
              </a>
              <div class="dropdown-menu">
                <!-- Show Login/Signup if user is not logged in -->
                <a v-if="!uid" href="/login" class="dropdown-item">Login</a>
                <a v-if="!uid" href="/Register" class="dropdown-item">Register</a>

                <!-- Show Logout and user-specific links if user is logged in -->
                <button v-if="uid" class="dropdown-item" @click="logout">Logout</button>
                <a v-if="uid" href="/MyProfile" class="dropdown-item">My Profile</a>
                <a v-if="uid" href="/my-orders" class="dropdown-item">My Order</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <!-- Nav Bar End -->

  <!-- Bottom Bar Start -->
  <div class="bottom-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-3">
          <div class="logo">
            <a href="index.html">
              <img src="assets/img/logo.png" alt="Logo">
            </a>
          </div>
        </div>
        <div class="col-md-6">
          <div class="search">
            <input type="text" placeholder="Search">
            <button><i class="fa fa-search"></i></button>
          </div>
        </div>
        <div class="col-md-3">
          <div class="user">
            <!-- Wishlist Button with dynamic count -->
            <a href="/Wishlist" class="btn wishlist">
              <i class="fa fa-heart"></i>
              <span>{{ wishlistCount }}</span> <!-- Dynamic Wishlist Count -->
            </a>

            <!-- Cart Button with dynamic count -->
            <a href="/Cart" class="btn cart">
              <i class="fa fa-shopping-cart"></i>
              <span>{{ cartCount }}</span> <!-- Dynamic Cart Count -->
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Bottom Bar End -->
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      uid: sessionStorage.getItem('uid'),
      userName: JSON.parse(sessionStorage.getItem('userName')),
      cart: JSON.parse(localStorage.getItem('cart')) || [], // Load cart from localStorage
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [] // Load wishlist from localStorage
    };
  },
  computed: {
    // Compute the cart count from the cart array
    cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0); // Calculate total items in the cart
    },
    // Compute the wishlist count from the wishlist array
    wishlistCount() {
      return this.wishlist.length; // Wishlist count is simply the length of the wishlist array
    }
  },
  watch: {
    // Watch for changes in cart and wishlist, and update localStorage accordingly
    cart(newCart) {
      localStorage.setItem('cart', JSON.stringify(newCart)); // Save updated cart to localStorage
    },
    wishlist(newWishlist) {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist)); // Save updated wishlist to localStorage
    }
  },
  methods: {
    logout() {
      this.uid = "";  // Clear uid
      this.userName = null;  // Clear userName
      sessionStorage.removeItem('uid'); // Clear sessionStorage
      sessionStorage.removeItem('userName'); // Clear sessionStorage
      this.$router.push('/'); // Redirect to home or login page
    },

    // Method to add a product to the cart (or update quantity)
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (!existingProduct) {
        this.cart.push({ ...product, quantity: 1 }); // Add product with quantity 1
      } else {
        existingProduct.quantity += 1; // Increment the quantity if product exists in cart
      }
      window.dispatchEvent(new Event("storage")); // Trigger a storage event to notify other components
    },

    // Method to add a product to the wishlist
    addToWishlist(product) {
      const existingProduct = this.wishlist.find(item => item.id === product.id);
      if (!existingProduct) {
        this.wishlist.push(product); // Add product to wishlist
      }
      window.dispatchEvent(new Event("storage")); // Trigger a storage event to notify other components
    }
  },
  mounted() {
    // On component mount, load the cart and wishlist data from localStorage
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Listen for any storage event (like adding/removing from cart or wishlist)
    window.addEventListener("storage", () => {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    });
  }
};
</script>

<style scoped>
/* Style the cart and wishlist buttons with counts */
.btn.cart,
.btn.wishlist {
  position: relative;
}

.btn.cart span,
.btn.wishlist span {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 14px;
}

/* Profile image styling */
.profile-img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border: 2px solid #ddd;
}
</style>
