<template>
  <b-col>
    <div class="header">
      <b-row>
        <b-col md="12">
          <h3>Project Name Details</h3>
        </b-col>
        <b-col md="12">
          <b-card title="Created At" sub-title="Owner :">
            <b-card-text>
              Project Full Description
            </b-card-text>
            <div class="participant float-right">
              <b>Participant : </b>
              <br />
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
            </div>
            <div class="btn-group mt-5">
              <b-button variant="outline-primary" size="sm"
                >Add New Task <span class="fa fa-plus"></span
              ></b-button>
              <b-button variant="outline-dark" size="sm"
                >Add New participant <span class="fa fa-user"></span
              ></b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col md="12">
        <h4>Current Task</h4>
      </b-col>
      <b-col md="12">
        <b-row>
          <b-col md="4" v-for="index in 3" :key="index">
            <b-card bg-variant="dark" text-variant="white" title="Task Tittle">
              <b-card-text>
                With supporting text below as a natural lead-in to additional
                content.
                <br />
                <b>Status :</b>
                <b-form-select
                  id="inline-form-custom-select-pref"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  :options="status"
                  :value="status[0]"
                ></b-form-select>
                <br />
                <b>Due Date : 20 April 2020</b>
              </b-card-text>
              <b-button variant="primary" @click="gotoDetailTask"
                >Detail</b-button
              >
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: "projectShow",
  data: () => {
    return {
      status: ["progress", "hold", "done"]
    };
  },
  methods: {
    gotoDetailTask() {
      this.$router.push({ name: "task.show", params: { id: "1" } });
    }
  }
};
</script>
