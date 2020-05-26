import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import { loader } from "./loader";

Vue.use(Vuex);

const BASE_URL = "http://collaborate.deploy:8080";

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: null,
    token: localStorage.getItem("user-token") || ""
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },

    SET_USER(state, value) {
      state.user = value;
    },

    SET_TOKEN(state, value) {
      state.token = value;
      localStorage.setItem("user-token", state.token);
    }
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      await Axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
      await Axios.post(`${BASE_URL}/api/login`, { credentials }).then(
        response => {
          this.commit("SET_TOKEN", response.data.token);
          dispatch("user");
        }
      );
      return "200";
    },

    // async signOut({dispatch})
    // {

    // },

    user({ commit }) {
      return Axios.get(`${BASE_URL}/api/user`)
        .then(response => {
          commit("SET_AUTHENTICATED", true);
          commit("SET_USER", response.data);
        })
        .catch(() => {
          commit("SET_AUTHENTICATED", false);
          commit("SET_USER", null);
        });
    }
  },
  modules: {
    loader
  }
});
