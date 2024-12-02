<template>
  <!-- Combo Deals Start -->
  <div class="combo-deals">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <h2>Bundle Offers</h2>
          <div class="row">
            <!-- Combo Bundle Listing -->
            <div class="col-md-4" v-for="bundle in bundles" :key="bundle.id">
              <div class="combo-item">
                <div class="combo-title">
                  <h3>{{ bundle.name }}</h3>
                  <p>{{ bundle.description }}</p>
                </div>
                <div class="combo-products">
                  <ul>
                    <li v-for="product in bundle.products" :key="product.id">
                      <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
                        <img :src='"http://127.0.0.1:8000/addproduct/" + product.photo' alt="product-image" />
                        <span>{{ product.productname }}</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="combo-price">
                  <h3><span>৳</span>{{ bundle.discountedPrice }}</h3>
                  <a class="btn" href="" @click.prevent="buyBundle(bundle)">
                    <i class="fa fa-shopping-cart"></i>Buy Bundle
                  </a>
                </div>
              </div>
            </div>
            <!-- End Combo Bundle Listing -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Combo Deals End -->
</template>


<script>
import DataService from "../services/DataService";

export default {
  name: "ComboDeals",
  data() {
    return {
      bundles: [], // Store combo deals fetched from the backend
      cart: JSON.parse(localStorage.getItem("cart")) || [], // Cart items
    };
  },
  methods: {
    // Fetch all bundle offers from the backend
    getBundles() {
      const uid = sessionStorage.getItem("uid");
      DataService.getBundles(uid)
        .then((response) => {
          if (response.data.data) {
            this.bundles = response.data.data; // Set bundle data
          } else {
            alert(response.data.error);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    // Add a bundle to the cart
    buyBundle(bundle) {
      // Add each product in the bundle to the cart
      bundle.products.forEach((product) => {
        const existingProductIndex = this.cart.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
          this.cart[existingProductIndex].quantity += 1; // Increase quantity if already in cart
        } else {
          this.cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
        }
      });

      // Sync the updated cart with localStorage
      localStorage.setItem("cart", JSON.stringify(this.cart));
      window.dispatchEvent(new Event("storage")); // Notify other components
    },
  },
  mounted() {
    this.getBundles(); // Fetch bundles when component is mounted
    window.addEventListener("storage", () => {
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    });
  },
};
</script>


<style scoped>
.combo-deals {
  padding: 20px;
}

.combo-deals h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.combo-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
}

.combo-title h3 {
  font-size: 18px;
  color: #333;
}

.combo-title p {
  color: #777;
  font-size: 14px;
}

.combo-products ul {
  list-style-type: none;
  padding: 0;
}

.combo-products li {
  margin: 5px 0;
}

.combo-products img {
  max-width: 100px;
  margin-right: 10px;
}

.combo-price h3 {
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
</style>
