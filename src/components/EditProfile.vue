<template>
  <div class="edit-profile">
    <div class="container">
      <h1 class="page-title">Edit Profile</h1>
      
      <div v-if="userName" class="edit-container">
        <!-- Edit Profile Form -->
        <div class="edit-card">
          <form @submit.prevent="saveProfile">
            <div class="form-group">
              <label for="full_name">Full Name</label>
              <input
                type="text"
                id="full_name"
                v-model="userName.full_name"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="userName.email"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                v-model="userName.phone"
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>

      <!-- If no profile data, show a message -->
      <div v-else>
        <p>You must log in to edit your profile.</p>
        <router-link to="/login" class="btn btn-primary">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  data() {
    return {
      userName: JSON.parse(sessionStorage.getItem('userName')) || null,
    };
  },
  methods: {
    saveProfile() {
      // Save the updated profile data to sessionStorage
      sessionStorage.setItem('userName', JSON.stringify(this.userName));

      // Redirect to the profile page after saving
      this.$router.push('/MyProfile');
    },
  },
};
</script>

<style scoped>
.edit-profile {
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

.edit-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

button {
  background-color: #05b347;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
