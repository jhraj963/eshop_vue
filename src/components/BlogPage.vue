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
                <div class="blog-image-container">
                    <img :src='"http://127.0.0.1:8000" + blog.photo' alt="package-place" class="blog-image" />
                </div>
                <div class="blog-content">
                    <h2>{{ blog.title }}</h2>
                    <p class="blog-author">By {{ blog.author }} | {{ formatDate(blog.date) }}</p>
                    <p class="blog-overview">{{ truncateText(blog.overview, 2) }}</p>
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
        // Truncate the blog overview to 2 or 3 lines
        truncateText(text, lines = 3) {
            const lineHeight = 1.5; // Adjust the line height (can be modified based on font size)
            const maxHeight = lines * lineHeight * 1.2; // Add extra space to make sure text fits within the lines
            const div = document.createElement("div");
            div.style.visibility = "hidden";
            div.style.position = "absolute";
            div.style.height = `${maxHeight}em`;
            div.style.lineHeight = `${lineHeight}em`;
            div.innerHTML = text;
            document.body.appendChild(div);

            // Truncate the text if it overflows
            if (div.scrollHeight > maxHeight) {
                return text.slice(0, 100) + "..."; // Add "..." at the end if it overflows
            }
            return text; // Return the full text if no truncation is needed
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
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
}

.blog-item:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

.blog-image-container {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.blog-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
}

.blog-content {
    padding: 15px;
}

.blog-content h2 {
    font-size: 24px;
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
    height: 4.5em;
    /* Limit to 3 lines */
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
}

.btn-read-more {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
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

@media (max-width: 768px) {
    .blog-content h2 {
        font-size: 20px;
    }

    .btn-read-more {
        font-size: 16px;
    }
}
</style>
