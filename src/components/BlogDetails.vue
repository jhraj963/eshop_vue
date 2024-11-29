<template>
    <div class="blog-details">
        <div v-if="loading" class="loading">Loading Blog...</div>
        <div v-else-if="error" class="error">Failed to fetch blog details. Please try again later.</div>
        <div v-else>
            <h1>{{ blog.title }}</h1>
            <p><strong>Author:</strong> {{ blog.author }}</p>
            <p><strong>Date:</strong> {{ formatDate(blog.date) }}</p>
            <p><strong>Overview:</strong> {{ blog.overview }}</p> <!-- Added Overview here -->
            <img :src="getPhotoUrl(blog.photo)" alt="Blog Image" v-if="blog.photo" />
            <div v-html="blog.content"></div>
        </div>
    </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
    name: "BlogDetails",
    data() {
        return {
            blog: {}, // Blog details object
            loading: true, // Loading state
            error: false, // Error state
        };
    },
    methods: {
        async fetchBlogDetails() {
            try {
                const blogId = this.$route.params.id;
                const response = await DataService.getBlogById(blogId);
                this.blog = response.data.data;
            } catch (e) {
                this.error = true;
                console.error("Error fetching blog details:", e);
            } finally {
                this.loading = false;
            }
        },
        getPhotoUrl(photo) {
            return `${process.env.VUE_APP_BACKEND_URL}${photo}`;
        },
        formatDate(date) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(date).toLocaleDateString(undefined, options);
        },
    },
    mounted() {
        this.fetchBlogDetails(); // Fetch blog details when component mounts
    },
};
</script>

<style scoped>
.blog-details {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.blog-details img {
    width: 100%;
    margin-top: 20px;
    border-radius: 8px;
}

.loading {
    font-size: 18px;
    color: #666;
    text-align: center;
    margin-top: 50px;
}

.error {
    color: red;
    font-size: 18px;
    text-align: center;
    margin-top: 50px;
}
</style>
