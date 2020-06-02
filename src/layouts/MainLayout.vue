<template>
  <div>
    <NavbarComponent />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavbarComponent from "@/components/master/partials/NavbarComponent.vue";

export default {
  name: "MainLayout",
  components: {
    NavbarComponent
  }
};
</script>

<style>
.header {
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
