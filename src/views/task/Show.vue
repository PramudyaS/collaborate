<template>
  <b-col>
    <div class="header">
      <b-row>
        <b-col md="12">
          <h3>{{ task.name }}</h3>
        </b-col>
        <b-col md="12">
          <b-card>
            <b-card-title>
              <b-row>
                <b-col md="6">
                  <p>Due Date : {{ task.due_date | formatDate }}</p>
                </b-col>
                <b-col md="3" offset-md="3">
                  <div class="task-status">
                    <b-form-select
                      id="inline-form-custom-select-pref"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      :options="status"
                      :value="status[0]"
                      size="sm"
                    ></b-form-select>
                  </div>
                </b-col>
              </b-row>
            </b-card-title>
            <b-card-text>
              {{ task.description }}
            </b-card-text>
            <b-row>
              <b-col md="4"> </b-col>
            </b-row>
            <div class="btn-group mt-5">
              <b-button variant="outline-primary" size="sm" v-b-modal.modal-1
                >Add New Todo <span class="fa fa-plus"></span
              ></b-button>
              <b-button variant="danger" size="sm" @click="deleteTask"
                ><span class="fa fa-trash"></span> Delete This Task</b-button
              >
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal ref="modal-1" id="modal-1" title="Create New Todo" hide-footer>
      <TodoCreate @updateTodo="updateTodo" @closeModal="hideModal" />
    </b-modal>
    <b-row>
      <b-col md="12">
        <h4>Current Todos</h4>
      </b-col>
      <TodoList :todo="todo" />
    </b-row>
  </b-col>
</template>

<script>
import TaskService from "@/api-services/task_services.js";

export default {
  name: "taskShow",
  components: {
    TodoList: () => import("../todos/Index.vue"),
    TodoCreate: () => import("../todos/Create.vue")
  },
  data: () => {
    return {
      status: ["progress", "hold", "done"],
      task: {
        name: null,
        description: null,
        due_date: null,
        project: null,
        status: null
      },
      todo: {
        id: null,
        name: null,
        status: null,
        task_id: null,
        description: null
      }
    };
  },
  computed: {
    duedateTask() {
      return (
        "Due Date : " + this.$options.filters.formatDate(this.task.due_date)
      );
    }
  },
  methods: {
    async detailTask() {
      await TaskService.find(this.$route.params.id)
        .then(response => {
          this.task = response.data.task;
        })
        .catch(error => {
          console.log(error);
        });
    },

    updateTodo(param) {
      this.todo = param;
    },

    hideModal() {
      this.$bvModal.hide("modal-1");
      this.$bvToast.toast("Succes Create Todo", {
        title: "Success",
        variant: "success",
        solid: true
      });
    },

    deleteTask() {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete this task.", {
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
          if (value) {
            await TaskService.delete(this.$route.params.id)
              .then(() => {
                this.$router.go(-1);
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created: function() {
    this.detailTask();
  }
};
</script>
