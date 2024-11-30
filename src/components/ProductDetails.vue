<template>
    <div class="product-detail-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <!-- Product Image -->
                    <div class="product-image" v-if="product && product.photo">
                        <img :src="`http://127.0.0.1:8000/addproduct/${product.photo}`" alt="Product Image" />
                    </div>
                    <div v-else>
                        <p>No image available.</p>
                    </div>
                </div>

                <div class="col-md-6">
                    <!-- Product Info -->
                    <div class="product-info" v-if="product">
                        <h1>{{ product.productname }}</h1>
                        <p>{{ product.description }}</p>
                        <div class="product-price">
                            <h3><span>৳</span>{{ product.price }}</h3>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-primary" @click.prevent="addToCart(product)">
                                <i class="fa fa-cart-plus"></i> Add to Cart
                            </button>
                            <button class="btn btn-secondary" @click.prevent="addToWishlist(product)">
                                <i class="fa fa-heart"></i> Add to Wishlist
                            </button>
                        </div>
                    </div>
                    <!-- Loading message if product data is not available yet -->
                    <div v-else>
                        <p>Loading product details...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
    name: "ProductDetails",
    data() {
        return {
            product: null, // Store the fetched product data
            cart: JSON.parse(localStorage.getItem("cart")) || [], // Cart items stored in localStorage
            wishlist: JSON.parse(localStorage.getItem("wishlist")) || [] // Wishlist items stored in localStorage
        };
    },
    methods: {
        // Method to fetch product details from API based on product ID
        fetchProductDetails() {
            const productId = this.$route.params.id; // Get the product ID from the route parameters
            DataService.getProductById(productId)
                .then((response) => {
                    if (response.data && response.data.data) {
                        this.product = response.data.data; // Set the product data
                    } else {
                        alert("Product not found!");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert("An error occurred while fetching product details.");
                });
        },
        // Method to add the product to the cart
        addToCart(product) {
            const existingProductIndex = this.cart.findIndex((item) => item.id === product.id);

            if (existingProductIndex !== -1) {
                this.cart[existingProductIndex].quantity += 1;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }

            // Save updated cart to localStorage
            localStorage.setItem("cart", JSON.stringify(this.cart));
        },
        // Method to add the product to the wishlist
        addToWishlist(product) {
            const existingProductIndex = this.wishlist.findIndex((item) => item.id === product.id);

            if (existingProductIndex === -1) {
                this.wishlist.push(product);
            }

            // Save updated wishlist to localStorage
            localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
        }
    },
    mounted() {
        this.fetchProductDetails(); // Fetch product details when the component is mounted
    }
};
</script>

<style scoped>
.product-detail-page {
    padding: 20px;
}

.product-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-bottom: 20px;
}

.product-info {
    padding: 20px;
}

.product-info h1 {
    font-size: 28px;
    margin-bottom: 10px;
}

.product-info p {
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
}

.product-price h3 {
    font-size: 24px;
    color: #333;
}

.product-actions .btn {
    margin-right: 10px;
}
</style>
