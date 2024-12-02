<template>
    <div class="container-xxl py-5">
        <div class="row justify-content-center">
            <div class="col-6">
                <h2 class="text-center text-primary mb-4">Register</h2>
                <form method="post" class="border p-4 bg-light rounded">
                    <!-- Full Name -->
                    <div class="mb-3">
                        <label for="full_name" class="form-label text-primary">Full Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="full_name"
                            name="full_name"
                            v-model="formData.full_name"
                            placeholder="Full Name"
                            :class="{ 'is-invalid': errors.full_name }"
                            required
                        />
                        <div class="invalid-feedback" v-if="errors.full_name">
                            {{ errors.full_name }}
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="mb-3">
                        <label for="email" class="form-label text-primary">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            v-model="formData.email"
                            placeholder="Email"
                            :class="{ 'is-invalid': errors.email }"
                            required
                        />
                        <div class="invalid-feedback" v-if="errors.email">
                            {{ errors.email }}
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="mb-3">
                        <label for="password" class="form-label text-primary">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            name="password"
                            v-model="formData.password"
                            placeholder="Enter a password"
                            :class="{ 'is-invalid': errors.password }"
                            required
                        />
                        <div class="invalid-feedback" v-if="errors.password">
                            {{ errors.password }}
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="mb-3">
                        <label for="c_password" class="form-label text-primary">Confirm Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="c_password"
                            name="c_password"
                            v-model="formData.c_password"
                            placeholder="Confirm your password"
                            :class="{ 'is-invalid': passwordMismatch }"
                            required
                        />
                        <div class="invalid-feedback" v-if="passwordMismatch">
                            Passwords do not match.
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="mb-3">
                        <label for="phone" class="form-label text-primary">Phone</label>
                        <input
                            type="text"
                            class="form-control"
                            id="phone"
                            name="phone"
                            v-model="formData.phone"
                            placeholder="Phone number"
                            :class="{ 'is-invalid': errors.phone }"
                            required
                        />
                        <div class="invalid-feedback" v-if="errors.phone">
                            {{ errors.phone }}
                        </div>
                    </div>

                    <!-- Address -->
                    <div class="mb-3">
                        <label for="address" class="form-label text-primary">Address</label>
                        <input
                            type="text"
                            class="form-control"
                            id="address"
                            name="address"
                            v-model="formData.address"
                            placeholder="Address"
                            :class="{ 'is-invalid': errors.address }"
                            required
                        />
                        <div class="invalid-feedback" v-if="errors.address">
                            {{ errors.address }}
                        </div>
                    </div>

                    <!-- State -->
                    <div class="mb-3">
                        <label for="state" class="form-label text-primary">State</label>
                        <input
                            type="text"
                            class="form-control"
                            id="state"
                            name="state"
                            v-model="formData.state"
                            placeholder="State"
                            :class="{ 'is-invalid': errors.state }"
                            required
                        />
                        <div class="invalid-feedback" v-if="errors.state">
                            {{ errors.state }}
                        </div>
                    </div>

                    <!-- Country -->
                    <div class="mb-3">
                        <label for="country" class="form-label text-primary">Country</label>
                        <input
                            type="text"
                            class="form-control"
                            id="country"
                            name="country"
                            v-model="formData.country"
                            placeholder="Country"
                            :class="{ 'is-invalid': errors.country }"
                            required
                        />
                        <div class="invalid-feedback" v-if="errors.country">
                            {{ errors.country }}
                        </div>
                    </div>

                    <!-- Upload Photo -->
                    <div class="mb-3">
                        <label for="photo" class="form-label text-primary">Upload Photo</label>
                        <input
                            type="file"
                            class="form-control"
                            id="photo"
                            name="photo"
                            @change="handleFileUpload"
                            :class="{ 'is-invalid': errors.photo }"
                        />
                        <div class="invalid-feedback" v-if="errors.photo">
                            {{ errors.photo }}
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="button"
                        @click="register"
                        class="btn btn-primary w-100"
                        :disabled="loading"
                    >
                        <span v-if="loading">Registering...</span>
                        <span v-else>Register</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import http from "../http-common";

export default {
    name: "Register",
    data() {
        return {
            formData: {
                full_name: "",
                email: "",
                password: "",
                c_password: "",
                phone: "",
                address: "",
                state: "",
                country: "",
                photo: null,
            },
            errors: {},
            passwordMismatch: false,
            loading: false,
        };
    },
    methods: {
        handleFileUpload(event) {
            this.formData.photo = event.target.files[0];
        },
        register() {
            this.errors = {};
            this.passwordMismatch = false;

            if (this.formData.password !== this.formData.c_password) {
                this.passwordMismatch = true;
                return;
            }

            const formDataToSend = new FormData();
            for (const key in this.formData) {
                formDataToSend.append(key, this.formData[key]);
            }

            this.loading = true;

            http
                .post("/register", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        alert("Registration successful!");
                        router.push({ name: "login" });
                    } else {
                        this.errors = response.data.errors || {};
                        alert("Registration failed!");
                    }
                })
                .catch((e) => {
                    if (e.response && e.response.data && e.response.data.errors) {
                        this.errors = e.response.data.errors;
                    } else {
                        alert("Something went wrong. Please try again.");
                    }
                    console.error(e);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
}

.text-center {
    text-align: center;
}

.btn-primary {
    background-color: #28a745;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
}

.btn-primary:hover {
    background-color: #218838;
}

.is-invalid {
    border-color: #dc3545;
}
.invalid-feedback {
    color: #dc3545;
}
</style>
