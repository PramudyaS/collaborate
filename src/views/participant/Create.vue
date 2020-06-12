<template>
  <b-col>
    <b-form>
      <b-form-group label="Name/Username">
        <b-input type="text" v-model="search" autocomplete="off"></b-input>
      </b-form-group>
    </b-form>
    <b-row v-if="users.length > 0">
      <p class="font-weight-bolder">Result Found</p>

      <b-col
        md="10"
        offset-md="1"
        v-for="(user, index) in searchFilter"
        :key="index"
        class="mt-2"
      >
        <b-card
          no-body
          class="card-suggestion overflow-hidden"
          bg-variant="primary"
        >
          <b-row no-gutters class="text-center card-suggestion-content">
            <b-col md="2">
              <b-avatar
                src="https://placekitten.com/300/300"
                class="avatar"
              ></b-avatar>
            </b-col>
            <b-col md="5">
              <p class="mt-2 text-white">{{ user.name }}</p>
            </b-col>
            <b-col offset-md="1">
              <b-btn
                variant="dark"
                size="sm"
                class="mt-1"
                @click="addParticipant(user.id, index)"
                ><span class="fa fa-plus"></span
              ></b-btn>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col md="12">
        <p class="text-center">Not Found</p>
      </b-col>
    </b-row>
  </b-col>
</template>

<style scoped>
.card-suggestion {
  min-height: 50px;
  border-color: #007bff;
}

.card-suggestion-content {
  margin-top: 5px;
}
</style>

<script>
import Axios from "axios";
import ProjectServices from "@/api-services/project_services.js";

const END_POINT = "http://collaborate.deploy:8080/api/user/search";

export default {
  name: "ParticipantCreate",
  data: () => {
    return {
      param: {
        project_id: null
      },
      project: {
        id: null,
        user_id: null
      },
      isTyping: false,
      search: "",
      users: []
    };
  },
  computed: {
    searchFilter() {
      if (this.search === "") {
        return [];
      }
      return this.users.filter(user => {
        return user.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    async usersSearch() {
      this.param.project_id = this.$route.params.id;
      await Axios.post(`${END_POINT}`, this.param)
        .then(response => {
          this.users = response.data.users;
        })
        .catch(error => {
          console.log(error);
        });
    },

    async addParticipant(user_id, index) {
      this.project.id = this.$route.params.id;
      this.project.user_id = user_id;
      await ProjectServices.addUser(this.project)
        .then(response => {
          console.log(response);
          this.$bvToast.toast("Success Add Participant", {
            title: "Success",
            autoHideDelay: 5000,
            variant: "success"
          });
          this.removeUsers(index);
        })
        .catch(error => {
          console.log(error);
        });
    },

    removeUsers(index) {
      this.$delete(this.users, index);
    },

    handleInput() {
      this.isTyping = !this.isTyping;
    }
  },
  created: function() {
    this.usersSearch();
  }
};
</script>
