<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Collaborate</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" to="/project">Project</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right v-if="isLoggedIn">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <b-avatar
              src="https://placekitten.com/300/300"
              size="2rem"
            ></b-avatar>
          </template>
          <b-dropdown-item href="#" to="my_profile">Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
