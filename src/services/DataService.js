import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/cuslogin", data);
  }
  addproduct(data) {
    return http.get("/addproduct", data);
  }
  faq(data) {
    return http.get("/faq", data);
  }
  customers(id) {
    return http.get(`/customers/${id}`);
  }


  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new DataService();