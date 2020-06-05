<template>
  <b-col md="12">
    <b-row>
      <b-col md="4" v-for="todo in todos" :key="todo.id">
        <b-card
          bg-variant="dark"
          text-variant="white"
          :title="todo.name"
          class="mt-3"
        >
          <b-card-text>
            {{ todo.description }}
          </b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import TodoService from "@/api-services/todo_services.js";

export default {
  name: "todoIndex",
  data: () => {
    return {
      todos: []
    };
  },
  methods: {
    async getTodos() {
      await TodoService.index(this.$route.params.id)
        .then(response => {
          this.todos = response.data.todos;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    this.getTodos();
  }
};
</script>
