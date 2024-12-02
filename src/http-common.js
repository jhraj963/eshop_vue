// import axios from "axios";

// export default axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

// import axios from "axios";

// export default axios.create({
//   baseURL: "http://127.0.0.1:8000/api", // Replace with your actual API base URL
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${sessionStorage.getItem("token")}`, // If token-based authentication is used
//   },
// });



import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Add token if available
  },
});

export default instance;



// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://127.0.0.1:8000/api", // Replace with your actual API base URL
//   headers: {
//     "Content-Type": "application/json", // Default for JSON requests
//     Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Add token if available
//   },
// });

// // For multipart/form-data requests, override the Content-Type header
// instance.interceptors.request.use((config) => {
//   if (config.headers['Content-Type'] === 'multipart/form-data') {
//     delete config.headers['Content-Type']; // Let the browser set the correct boundary for multipart
//   }
//   return config;
// });

// export default instance;
