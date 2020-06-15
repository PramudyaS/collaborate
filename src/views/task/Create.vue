<template>
  <b-col>
    <b-form>
      <b-form-group label="Name">
        <b-form-input type="text" required v-model="form.name"></b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea required v-model="form.description"></b-form-textarea>
      </b-form-group>
      <b-form-group label="Due Date">
        <b-form-datepicker
          id="example-datepicker"
          class="mb-2"
          v-model="form.due_date"
        ></b-form-datepicker>
      </b-form-group>

      <b-button @click="createTask" variant="primary" class="float-right"
        >Add <span class="fa fa-plus"></span
      ></b-button>
    </b-form>
  </b-col>
</template>

<script>
import TaskService from "@/api-services/task_services.js";

function initialState() {
  return {
    form: {
      name: null,
      description: null,
      due_date: null,
      project_id: null,
      creator_id: localStorage.getItem("user-id")
    }
  };
}

export default {
  data: () => {
    return initialState();
  },
  methods: {
    async createTask() {
      this.form.project_id = this.$route.params.id;
      await TaskService.store(this.form)
        .then(response => {
          this.$emit("updateTask", response.data.task);
          this.$emit("closeModal");
          this.resetForm();
        })
        .catch(error => {
          console.log(error);
        });
    },

    resetForm() {
      Object.assign(this.$data, initialState());
    }
  }
};
</script>
