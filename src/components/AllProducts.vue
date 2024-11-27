<template>
    <!-- Product List Start -->
    <div class="product-view">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <!--Product Listing -->
                        <div
                            class="col-md-3" 
                            v-for="product in addproduct" 
                            :key="product.id">
                            <div class="product-item">
                                <div class="product-title">
                                    <a :href="'product-detail.html?id=' + product.id">
                                        {{ product.productname }}
                                    </a>
                                    <div class="ratting">
                                        <i 
                                            class="fa fa-star" 
                                            v-for="i in 5" 
                                            :key="i" 
                                            :class="{ 'active': i <= product.rating }">
                                        </i>
                                    </div>
                                </div>
                                <div class="product-image">
                                    <a :href="'product-detail.html?id=' + product.id">
                                        <img :src="product.photo" alt="Product Image">
                                    </a>
                                    <div class="product-action">
                                        <a href="#"><i class="fa fa-cart-plus"></i></a>
                                        <a href="#"><i class="fa fa-heart"></i></a>
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
</template>

<script>
import DataService from "../services/DataService";

export default {
    name: 'AllProducts',
    data() {
        return {
            addproduct: [] // To store products dynamically fetched from the backend
        };
    },
    methods: {
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
        }
    },
    mounted() {
        this.allproducts(); // Fetch products when the component is mounted
    }
};
</script>
