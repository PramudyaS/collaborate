<template>
  <b-col>
    <div class="header">
      <b-row>
        <b-col md="12">
          <h3>Detail Project {{ project.name }}</h3>
        </b-col>
        <b-col md="12">
          <b-card :title="titleProject" :sub-title="creatorProject">
            <b-card-text>
              {{ project.description }}
            </b-card-text>
            <div class="participant float-right">
              <b>Participant : </b>
              <br />
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
            </div>
            <div class="btn-group mt-5">
              <b-button variant="outline-primary" size="sm" v-b-modal.modal-1
                >Add New Task <span class="fa fa-plus"></span
              ></b-button>
              <b-button
                variant="outline-dark"
                size="sm"
                v-b-modal.modal-participant
                >Add New participant <span class="fa fa-user"></span
              ></b-button>
              <b-button variant="danger" size="sm" @click="deleteProject"
                ><span class="fa fa-trash"></span> Delete Project</b-button
              >
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal ref="modal-1" id="modal-1" title="Create New Task" hide-footer>
      <TaskCreate @closeModal="hideModal" @updateTask="newTask" />
    </b-modal>
    <b-modal
      ref="modal-participant"
      id="modal-participant"
      title="Add New Participant"
      hide-footer
    >
      <ParticipantCreate />
    </b-modal>
    <b-row>
      <b-col md="12">
        <h4>Current Task</h4>
      </b-col>
      <TaskList :task="task" />
    </b-row>
  </b-col>
</template>

<script>
import ProjectService from "@/api-services/project_services.js";

export default {
  name: "projectShow",
  components: {
    TaskList: () => import("@/views/task/Index"),
    TaskCreate: () => import("@/views/task/Create"),
    ParticipantCreate: () => import("@/views/participant/Create")
  },
  data: () => {
    return {
      status: ["progress", "hold", "done"],
      task: [],
      project: {
        name: null,
        description: null,
        creator: null,
        created_at: null,
        date_start: null,
        date_end: null
      }
    };
  },
  computed: {
    titleProject() {
      return (
        "Created At : " +
        this.$options.filters.formatDate(this.project.created_at)
      );
    },

    creatorProject() {
      if (this.project.creator !== null) {
        return "Owner : " + this.project.creator.name;
      } else {
        return "Owner : ";
      }
    }
  },
  methods: {
    hideModal() {
      this.$refs["modal-1"].hide();
    },

    newTask(data) {
      this.task = data;
    },

    async projectDetail() {
      return ProjectService.find(this.$route.params.id)
        .then(response => {
          this.project = response.data.project;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteProject() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete this project.", {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(async value => {
          this.boxTwo = value;
          if (value) {
            await ProjectService.delete(this.$route.params.id)
              .then(() => {
                this.$router.push({ name: "dashboard" });
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    this.projectDetail();
  }
};
</script>
