import Axios from "axios";

const END_POINT = "http://collaborate.deploy:8080/api/task";

export default {
  index(id) {
    return Axios.get(`${END_POINT}/${id}`);
  },

  store(payload) {
    return Axios.post(`${END_POINT}`, payload);
  },

  find(id) {
    return Axios.get(`${END_POINT}/${id}/edit`);
  },

  delete(id) {
    return Axios.delete(`${END_POINT}/${id}`);
  }
};
