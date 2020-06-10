<template>
  <b-col md="12">
    <b-row>
      <b-col md="4" v-for="(todo,index) in todos" :key="index">
        <b-card
          :bg-variant="cardColor(todo.status)"
          text-variant="white"
          :title="todo.name"
          class="mt-3"
        >
          <b-card-text>
            {{ todo.description }}
          </b-card-text>

          <b-form-select v-once v-model="todo.status"  :options="options" @change="changeStatus(todo.status,todo.id)"></b-form-select>

        </b-card>
      </b-col>
    </b-row>
    <b-modal id="modalStatus" ref="modalStatus" title="Update Status" hide-footer>
      <modalStatus @closeModal="hideModal" :payload="update"/>
    </b-modal>
  </b-col>
</template>

<script>
import TodoService from "@/api-services/todo_services.js";

export default {
  name: "todoIndex",
  components:{
    modalStatus : () => import('@/views/todos/Update.vue')
  },
  props:['todo'],
  data: () => {
    return {
      todos: [],
      selected: 'progress',
      options: [
        { value: 'progress', text: 'Progress' },
        { value: 'hold', text: 'Hold' },
        { value: 'done', text: 'Done' },
      ], 
      update:{
        id:null,
        option:null
      }
    };
  },
  watch:{
    todo:function(param)
    {
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

    async changeStatus(option,id)
    {
      this.$bvModal.show('modalStatus');
      this.update.id = id;
      this.update.option = option;
    },

    cardColor(status)
    {
      if (status === "progress") {
        return 'dark';
      }else if(status === "hold"){
        return 'secondary';
      }else{
        return 'primary';
      }
    },

    hideModal()
    {
      this.$bvModal.hide('modalStatus');
      this.$bvToast.toast('Success Update Todo', {
          title: "Success",
          variant: "success",
          solid: true
      });
    },
  },
  mounted: function() {
    this.getTodos();
  }
};
</script>
