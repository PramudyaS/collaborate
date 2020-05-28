<template>
  <div id="app">
    <Loader :isVisible="loading" />
    <router-view />
  </div>
</template>

<script>
import Axios from "axios";
import Loader from "@/components/master/partials/LoaderComponent.vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "AppLayout",
  components: {
    Loader
  },
  computed: {
    ...mapState("loader", ["loading"]),
    ...mapActions(["signOut"])
  },
  created() {
    Axios.interceptors.request.use(
      config => {
        this.$store.commit("loader/show");
        return config;
      },
      error => {
        this.$store.commit("loader/hide");
        return Promise.reject(error);
      }
    );

    Axios.interceptors.response.use(
      response => {
        this.$store.commit("loader/hide");
        return response;
      },
      error => {
        this.$store.commit("loader/hide");
        return Promise.reject(error);
      }
    );

    Axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch("signOut");
        }
        return Promise.reject(error);
      }
    );
  }
};
</script>

<style>
#app {
  padding-bottom: 200px;
}
</style>
