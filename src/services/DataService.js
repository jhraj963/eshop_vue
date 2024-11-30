import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/cuslogin", data);
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

  // Fetch order details by order ID
  getOrderDetails(orderId) {
    return http.get(`/allorder/${orderId}`);
  }
}

export default new DataService();
