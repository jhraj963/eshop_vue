<template>
  <div class="my-profile">
    <!-- Profile Header -->
    <div class="container">
      <h1 class="page-title">My Profile</h1>

      <div v-if="userName" class="profile-container">
        <!-- Profile Info -->
        <div class="profile-card">
          <div class="profile-header">
            <!-- Profile Picture -->
            <div class="profile-pic">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s" alt="Profile Picture" class="profile-img" />
            </div>
            <div class="profile-details">
              <h2>{{ userName.full_name }}</h2>
              <p class="profile-email">E-mail: {{ userName.email }}</p>
              <p class="profile-phone">Phone: {{ userName.phone }}</p>
              <p class="profile-address">Address: {{ userName.address }}</p>
            </div>
          </div>
          <button @click="editProfile" class="btn btn-primary">Edit Profile</button>
        </div>
      </div>

      <!-- If not logged in, show a message -->
      <div v-else>
        <p>Please log in to view and edit your profile.</p>
        <router-link to="/login" class="btn btn-primary">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProfile',
  data() {
    return {
      userName: JSON.parse(sessionStorage.getItem('userName')) || null,
    };
  },
  methods: {
    editProfile() {
      this.$router.push('/EditProfile');
    },
  },
};
</script>

<style scoped>
.my-profile {
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.profile-pic {
  margin-bottom: 20px;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-details h2 {
  font-size: 1.8rem;
  margin: 10px 0;
}

.profile-email, .profile-phone {
  font-size: 1.1rem;
  color: #666;
  margin: 5px 0;
}

.btn {
  background-color: #05b347;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-primary {
  margin-top: 20px;
}

</style>
