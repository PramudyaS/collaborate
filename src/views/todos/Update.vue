<template>
  <b-col>
    <b-form-group label="File">
      <b-form-file
        v-model="form.file"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-form-group>
    <b-form-group label="URL">
      <b-input type="text" v-model="form.url"></b-input>
    </b-form-group>

    <b-button variant="primary" class="float-right" @click="updateTodo"
      >Submit</b-button
    >
  </b-col>
</template>

<script>
import TodoService from "@/api-services/todo_services.js";

export default {
  name: "todos.update",
  props: ["payload"],
  data: () => {
    return {
      form: {
        file: null,
        url: null,
        payload: null,
        done_by: 1
      }
    };
  },
  methods: {
    getPayload() {
      this.form.payload = this.payload;
    },

    async updateTodo() {
      const headers = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      let formData = new FormData();
      formData.append("file", this.form.file);
      formData.append("url", this.form.url);
      formData.append("id", this.form.payload.id);
      formData.append("status", this.form.payload.option);

      await TodoService.update(formData.getAll("id"), formData, headers)
        .then(response => {
          if (response.data.message === "success") {
            this.$emit("closeModal");
          }
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created: function() {
    this.getPayload();
  }
};
</script>
