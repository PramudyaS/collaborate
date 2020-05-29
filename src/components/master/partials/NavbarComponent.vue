<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark custom-bg-primary">
    <a class="navbar-brand" href="#">Collaborate</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#"
            >Home <span class="sr-only">(current)</span></a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-if="isLoggedIn" @click="logout"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NavbarComponent",
  data: () => {
    return {
      isLoggedIn: localStorage.getItem("user-token") ? true : false
    };
  },
  methods: {
    ...mapActions({
      signOut: "signOut"
    }),

    logout() {
      this.$store.dispatch("signOut").then(response => {
        if (response == 200) {
          document.location.href = "/";
        }
      });
    }
  }
};
</script>

<style scoped></style>
