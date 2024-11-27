<template>
  <div class="my-profile">
    <!-- Display loading message while data is being fetched -->
    <div v-if="loading">Loading your profile...</div>

    <!-- Display error message if there's an issue fetching data -->
    <div v-if="error" class="error-message">
      <p>There was an error loading your profile. Please try again later.</p>
    </div>

    <!-- Display the customer's profile information if successfully fetched -->
    <div v-if="!loading && !error && myprofile">
      <h2>My Profile</h2>
      <div>
        <p><strong>Full Name:</strong> {{ myprofile.full_name || 'N/A' }}</p>
        <p><strong>Email:</strong> {{ myprofile.email || 'N/A' }}</p>
        <p><strong>Phone:</strong> {{ myprofile.phone || 'N/A' }}</p>
        <p><strong>Address:</strong> {{ myprofile.address || 'N/A' }}</p>
      </div>
    </div>

    <!-- Display a fallback message if no profile data is available -->
    <div v-if="!loading && !error && !myprofile">
      <p>No profile data available.</p>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService"; // Ensure this points to your DataService file

export default {
  name: "MyProfile",
  data() {
    return {
      myprofile: null, // To store the fetched profile data
      loading: true,   // To manage loading state
      error: false,    // To manage error state
    };
  },
  methods: {
    async fetchProfile() {
      try {
        // Retrieve the user ID from sessionStorage
        const uid = sessionStorage.getItem("uid");
        if (!uid) {
          throw new Error("No user ID found in sessionStorage.");
        }

        console.log("Fetching profile for UID:", uid); // Debug: Log the UID

        // Call the API to fetch customer profile data
        const response = await DataService.customers(uid);

        console.log("API Response:", response); // Debug: Log the API response

        // Handle the API response
        if (response.data && response.data.data) {
          this.myprofile = response.data.data; // Assign data to myprofile
        } else {
          throw new Error("No profile data found in the response.");
        }
      } catch (error) {
        this.error = true; // Set error state
        console.error("Error fetching profile:", error.message); // Debug: Log the error
      } finally {
        this.loading = false; // Stop the loading indicator
      }
    },
  },
  mounted() {
    // Fetch profile data when the component is mounted
    this.fetchProfile();
  },
};
</script>

