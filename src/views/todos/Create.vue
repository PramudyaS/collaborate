<template>
  <b-col>
    <b-form>
      <b-form-group label="Name">
        <b-form-input type="text" required v-model="form.name"></b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea
          type="text"
          required
          v-model="form.description"
        ></b-form-textarea>
      </b-form-group>

      <b-button @click="createTodo" variant="primary" class="float-right"
        >Add <span class="fa fa-plus"></span
      ></b-button>
    </b-form>
  </b-col>
</template>

<script>
import TodoServices from "@/api-services/todo_services.js";

function initialState() {
  return {
    form: {
      task_id: null,
      name: null,
      description: null
    }
  };
}

export default {
  name: "todoCreate",
  data: () => {
    return initialState();
  },
  methods: {
    async createTodo() {
      this.form.task_id = this.$route.params.id;
      await TodoServices.store(this.form)
        .then(response => {
          console.log(response);
          this.$emit("updateTodo", response.data.todo);
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
