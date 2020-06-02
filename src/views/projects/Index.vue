<template>
  <b-container fluid>
    <b-row>
      <b-col md="4" sm="12" v-for="project in projects" :key="project.id">
        <b-card
          :title="project.name"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 card-project"
          @click="gotoTask"
        >
          <b-card-text>
            {{ project.description }}
            <br />
            <b>Date : {{ project.date_start }} - {{ project.date_end }}</b>
            <b-avatar src="https://placekitten.com/300/300"></b-avatar>
            <b-avatar src="https://placekitten.com/300/300"></b-avatar>
            <b-avatar src="https://placekitten.com/300/300"></b-avatar>
          </b-card-text>
          <b-progress value="25" max="100" show-progress animated></b-progress>
        </b-card>
      </b-col>
      <router-view @updateProject="updateProject" />
      <b-col md="4" v-if="showNavigationCard">
        <b-card class="project-card-shadow" @click="showCreate">
          <b-card-text class="text-center align-middle">
            <p style="margin-top:50%">
              Create New Project <span class="fa fa-plus"></span>
            </p>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ProjectServices from "@/api-services/project_services.js";

export default {
  name: "ProjectList",
  data: () => {
    return {
      projects: [],
      shadowCard: true
    };
  },
  watch: {
    $route(to, from) {
      if (from.name === "project.create") {
        this.shadowCard = true;
      }
    }
  },
  computed: {
    showNavigationCard() {
      return this.shadowCard;
    }
  },
  methods: {
    async getProjects() {
      await ProjectServices.index(localStorage.getItem("user-id"))
        .then(response => {
          this.projects = response.data.projects;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    showCreate() {
      this.$router.push({ name: "project.create" });
      this.shadowCard = false;
    },

    updateProject(project) {
      this.projects.push(project);
    },

    gotoTask() {
      this.$router.push({ name: "task.index" });
    }
  },
  mounted: function() {
    this.getProjects();
  }
};
</script>

<style scoped>
.card-project:hover {
  cursor: pointer;
}

.project-card-shadow {
  height: 350px;
  border: 2px dashed grey;
}

.project-card-shadow:hover {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active di bawah versi 2.1.8 */ {
  opacity: 0;
}
</style>
