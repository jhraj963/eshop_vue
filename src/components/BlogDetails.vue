<template>
    <div class="blog-details">
        <!-- Loading and Error States -->
        <div v-if="loading" class="loading">Loading Blog...</div>
        <div v-else-if="error" class="error">Failed to fetch blog details. Please try again later.</div>

        <!-- Blog Content -->
        <div v-else class="content-container">
            <div class="text-content">
                <h1>{{ blog.title }}</h1>
                <p><strong>Author:</strong> {{ blog.author }}</p>
                <p><strong>Date:</strong> {{ formatDate(blog.date) }}</p>
                <p><strong>Overview:</strong> {{ blog.overview }}</p> <!-- Overview section -->
                <div v-html="blog.content"></div>
            </div>

            <!-- Blog Image -->
            <div class="image-content">
                <img :src='"http://127.0.0.1:8000" + blog.photo' alt="Blog Image" />
            </div>
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.content-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.text-content {
    flex: 1;
    padding-right: 20px;
    line-height: 1.6;
}

.text-content h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
}

.text-content p {
    font-size: 16px;
    color: #555;
    margin-bottom: 15px;
}

.text-content strong {
    font-weight: bold;
}

.image-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    margin-top: 20px;
}

.image-content img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
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

/* Responsive Adjustments */
@media (max-width: 768px) {
    .content-container {
        flex-direction: column;
    }

    .text-content {
        padding-right: 0;
    }

    .image-content {
        padding-left: 0;
        margin-top: 20px;
    }
}
</style>
