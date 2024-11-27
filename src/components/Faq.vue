<template>
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>

    <!-- Loading State -->
    <div v-if="loading" class="loading">Loading FAQs...</div>

    <!-- Error State -->
    <div v-if="error" class="error">Error fetching FAQs. Please try again later.</div>

    <!-- FAQ List -->
    <div v-for="(item, index) in faqList" :key="index" class="faq-item">
      <div class="faq-question" @click="toggleAnswer(index)">
        <h3>{{ item.question }}</h3>
        <span v-if="activeIndex === index">{{ active ? '▲' : '▼' }}</span>
      </div>
      <div v-if="activeIndex === index && active" class="faq-answer">
        <p>{{ item.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: 'Faq',  // Setting the name of the component

  data() {
    return {
      faqList: [],      // Array to hold the FAQ data
      activeIndex: null,  // Tracks the active FAQ index
      active: false,      // Whether the answer is expanded or collapsed
      loading: true,      // Loading state while fetching data
      error: false,       // Error state for API issues
    };
  },

  methods: {
    allfaq() {
      DataService.faq()  // Fetch the FAQ data from the API
        .then(response => {
          if (response.data) {
            this.faqList = response.data.data;  // Set FAQ data to be displayed
          } else {
            alert(response.data.error);  // Handle any errors in the response
          }
        })
        .catch(e => {
          console.log(e);  // Log the error if API request fails
          this.error = true;  // Set error state
        })
        .finally(() => {
          this.loading = false;  // Set loading to false once the data has been fetched
        });
    },

    toggleAnswer(index) {
      if (this.activeIndex === index) {
        this.active = !this.active;  // Toggle the answer visibility
      } else {
        this.activeIndex = index;
        this.active = true;  // Show the answer for the selected FAQ
      }
    },
  },

  mounted() {
    this.allfaq();  // Fetch FAQ data when the component is mounted
  },
};
</script>

<style scoped>
.faq-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}

.faq-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.faq-question {
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-answer {
  padding: 10px 0;
  color: #087deb;
  font-size: 20px;
}

.faq-question:hover {
  color: #ee2308;
}

.loading {
  font-size: 18px;
  color: #666;
}

.error {
  color: red;
  font-size: 18px;
}
</style>
