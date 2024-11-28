<template>
  <!-- Top bar Start -->
  <div class="top-bar">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <i class="fa fa-envelope"></i> support@email.com
        </div>
        <div class="col-sm-6">
          <i class="fa fa-phone-alt"></i> +012-345-6789
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
            <a href="/AllProducts" class="nav-item nav-link">Products</a>
            <a href="/ProductDetails" class="nav-item nav-link">Product Detail</a>
            <a href="cart.html" class="nav-item nav-link">Cart</a>
            <a href="checkout.html" class="nav-item nav-link">Checkout</a>
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
          </div>
          <div class="navbar-nav ml-auto">
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown"> 
                <!-- Display the user's full name if logged in, otherwise show 'User Account' -->
                {{ uid ? userName.full_name : 'User Account' }}
              </a>
              <div class="dropdown-menu">
                <!-- Show Login/Signup if user is not logged in -->
                <a v-if="!uid" href="/login" class="dropdown-item">Login</a>
                <a v-if="!uid" href="/register" class="dropdown-item">Register</a>

                <!-- Show Logout and user-specific links if user is logged in -->
                <button v-if="uid" class="dropdown-item" @click="logout">Logout</button>
                <a v-if="uid" href="/MyProfile" class="dropdown-item">My Profile</a>
                <a v-if="uid" href="/MyOrder" class="dropdown-item">My Order</a>
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
            <a href="wishlist.html" class="btn wishlist">
              <i class="fa fa-heart"></i>
              <span>(0)</span>
            </a>
            <a href="cart.html" class="btn cart">
              <i class="fa fa-shopping-cart"></i>
              <span>(0)</span>
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
      userName: JSON.parse(sessionStorage.getItem('userName'))
    };
  },
  watch: {
    // Watch for changes in sessionStorage and update uid and userName
    'uid': function(newVal) {
      if (newVal) {
        this.userName = JSON.parse(sessionStorage.getItem('userName'));
      } else {
        this.userName = null; // Reset userName when logged out
      }
    }
  },
  methods: {
    logout() {
      this.uid = "";  // Clear uid
      this.userName = null;  // Clear userName
      sessionStorage.removeItem('uid'); // Clear sessionStorage
      sessionStorage.removeItem('userName'); // Clear sessionStorage
      this.$router.push('/'); // Redirect to home or login page
    }
  }
}
</script>
