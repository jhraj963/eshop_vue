import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/cuslogin", data);
  }

  register(data) {
    return http.post("/cusregister", data);
  }

  addproduct(data) {
    return http.get("/addproduct", data);
  }

  getProductById(id) {
    return http.get(`/addproduct/${id}`);
  }

  faq(data) {
    return http.get("/faq", data);
  }

  blog(data) {
    return http.get("/blog", data);
  }

  getBlogById(id) {
    return http.get(`/blog/${id}`);
  }

  customers(id) {
    return http.get(`/customers/${id}`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }

  placeOrder(orderData) {
    return http.post("/allorder/create", orderData);
  }

  getOrderDetails(orderId) {
    return http.get(`/allorder/${orderId}`);
  }

  // New method to fetch bundle offers (combo deals)
  getBundles(uid) {
    return http.get(`/bundles/${uid}`); // Assuming a new backend route for fetching bundles
  }

  // New method to get all orders for a specific customer
  getOrdersByCustomer(customerId) {
    return http.get(`/customer/${customerId}/orders`);
  }

}

export default new DataService();
