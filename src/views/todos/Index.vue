<template>
  <b-col md="12">
    <b-row v-if="todos.length > 0">
      <b-col md="4" v-for="(todo, index) in todos" :key="index">
        <b-card
          :bg-variant="cardColor(todo.status)"
          text-variant="white"
          class="mt-3"
        >
          <b-card-title>
            <b-row>
              <b-col md="7">
                {{ todo.name }}
              </b-col>
              <b-col offset-md="2">
                <b-button @click="deleteTodo(todo.id, index)"
                  ><span class="fa fa-window-close close"></span
                ></b-button>
              </b-col>
            </b-row>
          </b-card-title>
          <b-card-text>
            {{ todo.description }}
          </b-card-text>

          <b-form-select
            v-once
            v-model="todo.status"
            :options="options"
            @change="changeStatus(todo.status, todo.id)"
          ></b-form-select>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col md="12">
        <b-jumbotron
          class="text-center"
          header="No Todo Found"
          lead="Create your first todo"
        >
        </b-jumbotron>
      </b-col>
    </b-row>
    <b-modal
      id="modalStatus"
      ref="modalStatus"
      title="Update Status"
      hide-footer
    >
      <modalStatus @closeModal="hideModal" :payload="update" />
    </b-modal>
  </b-col>
</template>

<script>
import TodoService from "@/api-services/todo_services.js";

export default {
  name: "todoIndex",
  components: {
    modalStatus: () => import("@/views/todos/Update.vue")
  },
  props: ["todo"],
  data: () => {
    return {
      todos: [],
      selected: "progress",
      options: [
        { value: "progress", text: "Progress" },
        { value: "hold", text: "Hold" },
        { value: "done", text: "Done" }
      ],
      update: {
        id: null,
        option: null
      }
    };
  },
  watch: {
    todo: function(param) {
      this.todos.push(param);
    }
  },
  methods: {
    async getTodos() {
      await TodoService.index(this.$route.params.id)
        .then(response => {
          this.todos = response.data.todos;
        })
        .catch(error => {
          console.log(error);
        });
    },

    async changeStatus(option, id) {
      this.$bvModal.show("modalStatus");
      this.update.id = id;
      this.update.option = option;
    },

    cardColor(status) {
      if (status === "progress") {
        return "dark";
      } else if (status === "hold") {
        return "secondary";
      } else {
        return "primary";
      }
    },

    hideModal() {
      this.$bvModal.hide("modalStatus");
      this.$bvToast.toast("Success Update Todo", {
        title: "Success",
        variant: "success",
        solid: true
      });
    },

    deleteTodo(id, index) {
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
        .then(async response => {
          if (response) {
            await TodoService.delete(id)
              .then(() => {
                this.removeTodo(index);
                this.$bvToast.toast("Success Delete Todo", {
                  title: "Success",
                  variant: "success",
                  solid: true
                });
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    removeTodo(index) {
      this.$delete(this.todos, index);
    }
  },
  mounted: function() {
    this.getTodos();
  }
};
</script>

<style scoped>
.close {
  color: white;
}

.close:hover {
  text-shadow: 1px 1px 1px #ccc;
  font-size: 24px;
  cursor: pointer;
  color: #dc3545;
}
</style>
