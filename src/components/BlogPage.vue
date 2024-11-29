<template>
    <div class="blog-container">
        <h1>Our Latest Blogs</h1>

        <!-- Loading State -->
        <div v-if="loading" class="loading">Loading blogs...</div>

        <!-- Error State -->
        <div v-if="error" class="error">Error fetching blogs. Please try again later.</div>

        <!-- Blog List -->
        <div v-if="blogList.length > 0" class="blog-grid">
            <div v-for="(blog, index) in blogList" :key="index" class="blog-item">
                <img v-if="blog.photo" :src="blog.photo.split(',')[0]" alt="Blog" class="blog-image" />
                <div class="blog-content">
                    <h2>{{ blog.title }}</h2>
                    <p class="blog-author">By {{ blog.author }} | {{ formatDate(blog.date) }}</p>
                    <p class="blog-overview">{{ blog.overview }}</p>
                    <button @click="readMore(blog.id)" class="btn-read-more">Read More</button>
                </div>
            </div>
        </div>

        <!-- No Blogs Found -->
        <div v-else-if="!loading && blogList.length === 0" class="no-blogs">
            No blogs available at the moment.
        </div>
    </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
    name: "BlogPage",
    data() {
        return {
            blogList: [], // Array to store fetched blogs
            loading: true, // Loading state
            error: false, // Error state
        };
    },
    methods: {
        fetchBlogs() {
            DataService.blog()
                .then((response) => {
                    if (response.data && response.data.data) {
                        this.blogList = response.data.data; // Populate blogList with API data
                    } else {
                        alert("No data available.");
                    }
                })
                .catch((e) => {
                    console.error(e);
                    this.error = true; // Set error state if API request fails
                })
                .finally(() => {
                    this.loading = false; // Stop loading once request completes
                });
        },
        formatDate(date) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(date).toLocaleDateString(undefined, options); // Format date
        },
        readMore(blogId) {
            this.$router.push(`/blog/${blogId}`); // Navigate to blog detail page
        },
    },
    mounted() {
        this.fetchBlogs(); // Fetch blogs on component mount
    },
};
</script>

<style scoped>
.blog-container {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.blog-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.blog-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.blog-content {
    padding: 15px;
}

.blog-content h2 {
    font-size: 22px;
    margin: 10px 0;
}

.blog-author {
    font-size: 14px;
    color: #777;
    margin-bottom: 10px;
}

.blog-overview {
    font-size: 16px;
    margin-bottom: 15px;
    color: #333;
}

.btn-read-more {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-read-more:hover {
    background-color: #0056b3;
}

.loading,
.error,
.no-blogs {
    font-size: 18px;
    color: #555;
    margin-top: 20px;
}
</style>
