<template>
  <b-col md="12">
    <b-row>
      <b-col md="4" v-for="(task, index) in tasks" :key="index">
        <b-card
          bg-variant="dark"
          text-variant="white"
          :title="task.name"
          class="mt-3"
        >
          <b-card-text>
            {{ task.description }}
            <br />
            <b>Status : {{ task.status }}</b>
            <b-form-select
              id="inline-form-custom-select-pref"
              class="mb-2 mr-sm-2 mb-sm-0"
              :options="status"
              :value="status[0]"
            ></b-form-select>
            <br />
            <b>Due Date : {{ task.due_date }}</b>
          </b-card-text>
          <b-button variant="primary" @click="gotoDetailTask(task.id)"
            >Detail</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import TaskService from "@/api-services/task_services.js";

export default {
  name: "taskIndex",
  props: ["task"],
  data: () => {
    return {
      status: ["progress", "hold", "done"],
      tasks: []
    };
  },
  watch: {
    task: function(param) {
      this.tasks.push(param);
    }
  },
  methods: {
    async getTask() {
      await TaskService.index(this.$route.params.id)
        .then(response => {
          this.tasks = response.data.tasks;
        })
        .catch(error => {
          console.log(error);
        });
    },

    gotoDetailTask(id) {
      this.$router.push({ name: "task.show", params: { id: id } });
    }
  },
  mounted: function() {
    this.getTask();
  }
};
</script>
