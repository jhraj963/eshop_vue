<template>
  <div class="my-profile">
    <!-- Display loading message while the data is being fetched -->
    <div v-if="loading">Loading your profile...</div>

    <!-- Display error message if there's an issue fetching data -->
    <div v-if="error" class="error-message">
      There was an error loading your profile. Please try again later.
    </div>

    <!-- Display the customer's profile information if successfully fetched -->
    <div v-if="!loading && !error && myprofile">
      <h2>My Profile</h2>
      <div>
        <p><strong>Full Name:</strong> {{ myprofile.full_name || 'N/A' }}</p>
        <p><strong>Email:</strong> {{ myprofile.email || 'N/A' }}</p>
        <p><strong>Phone:</strong> {{ myprofile.phone || 'N/A' }}</p>
        <p><strong>Address:</strong> {{ myprofile.address || 'N/A' }}</p>
        <!-- Add any other profile fields you need here -->
      </div>
    </div>

    <!-- Display if no profile data is available -->
    <div v-if="!loading && !error && !myprofile">
      <p>No profile data available.</p>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService"; // Importing the DataService to fetch data

export default {
  name: 'MyProfile',
  data() {
    return {
      myprofile: null,  // To store the profile data
      loading: true,    // To manage loading state
      error: false,     // To manage error state
    };
  },
  methods: {
    // Method to fetch the customer profile from the API
    fetchProfile() {
      let uid = sessionStorage.getItem('uid');  // Retrieve the user ID from sessionStorage
      if (!uid) {
        this.error = true;
        console.error('Error: No user ID found in sessionStorage.');
        this.loading = false;
        return;
      }

      // Log the UID and start the API request
      console.log('Fetching profile for UID:', uid);

      // Make the API call to fetch customer profile data
      DataService.customers(uid)
        .then(response => {
          console.log('API Response:', response);  // Log the API response to inspect the structure

          if (response.data && response.data.data) {
            this.myprofile = response.data.data;  // Set profile data from API response
          } else {
            this.error = true;  // Handle errors if no profile data is found
            console.error('Error: No profile data found.');
          }
        })
        .catch(error => {
          this.error = true;  // Set error state in case of failure
          console.error('Error fetching profile:', error);
        })
        .finally(() => {
          this.loading = false;  // End loading state once the request is finished
        });
    }
  },
  mounted() {
    // Call the fetchProfile method when the component is mounted
    this.fetchProfile();
  }
};
</script>

<style scoped>
.my-profile {
  font-family: Arial, sans-serif;
}

.error-message {
  color: red;
}

h2 {
  color: #333;
}

p {
  font-size: 16px;
  color: #555;
}

strong {
  font-weight: bold;
}
</style>
