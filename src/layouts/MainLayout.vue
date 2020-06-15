<template>
  <div>
    <NavbarComponent />
    <b-container>
       <b-row class="mt-3" v-if="breadcrumb">
          <b-col>
            <b-breadcrumb class="breadcrumb" :items="breadcrumbCount">
            </b-breadcrumb>
          </b-col>
        </b-row>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavbarComponent from "@/components/master/partials/NavbarComponent.vue";

export default {
  name: "MainLayout",
  data:()=>{
    return{
      breadcrumb : false
    }
  },
  components: {
    NavbarComponent
  },
  watch:{
    '$route'(){
        if (this.$route.meta.breadcrumb) {
          this.breadcrumb = true;
        }else{
          this.breadcrumb = false;
        }
    }
  },
  computed:{
    breadcrumbCount()
    {
      if (this.$route.meta.breadcrumb) {
          return this.$route.meta.breadcrumb;
      }else{
          return [];
      }
    },
  },
};
</script>

<style>
.header {
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
