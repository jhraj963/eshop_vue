// import axios from "axios";

// export default axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`, // If token-based authentication is used
  },
});

