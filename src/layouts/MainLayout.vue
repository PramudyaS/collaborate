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

  export default
  {
    name:"MainLayout",
    components:{
      NavbarComponent
    }
  }
</script>
