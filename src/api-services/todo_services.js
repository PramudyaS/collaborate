import Axios from "axios";

const END_POINT = "http://collaborate.deploy:8080/api/todo";

export default {
  index(id) {
    return Axios.get(`${END_POINT}/${id}`);
  },

  store(payload) {
    return Axios.post(`${END_POINT}`, payload);
  },

  update(id, payload, headers) {
    return Axios.post(`${END_POINT}/${id}`, payload, headers);
  },

  delete(id) {
    return Axios.delete(`${END_POINT}/${id}`);
  }
};
