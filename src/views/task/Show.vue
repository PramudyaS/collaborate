<template>
  <b-col>
    <div class="header">
      <b-row>
        <b-col md="12">
          <h3>{{ task.name }}</h3>
        </b-col>
        <b-col md="12">
          <b-card :title="duedateTask">
            <b-card-text>
              {{ task.description }}
            </b-card-text>
            <b-row>
              <b-col md="4">
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
            <div class="participant float-right mt-3">
              <b>Contributor : </b>
              <br />
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
            </div>
            <div class="btn-group mt-5">
              <b-button variant="outline-primary" size="sm" v-b-modal.modal-1
                >Add New Todo <span class="fa fa-plus"></span
              ></b-button>
              <b-button variant="outline-dark" size="sm"
                >Add New Contributor <span class="fa fa-user"></span
              ></b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal ref="modal-1" id="modal-1" title="Create New Todo" hide-footer>
      <TodoCreate />
    </b-modal>
    <b-row>
      <b-col md="12">
        <h4>Current Todos</h4>
      </b-col>
      <TodoList />
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
          console.log(response.data.task);
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
