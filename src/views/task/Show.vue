<template>
  <b-col>
    <div class="header">
      <b-row>
        <b-col md="12">
          <h3>Task Detail</h3>
        </b-col>
        <b-col md="12">
          <b-card title="Due Date :">
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
            <b-card-text>
              Task Full Description Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Sint modi unde illum deleniti blanditiis
              similique earum assumenda adipisci atque, dolorum, beatae ullam
              nisi iste rerum, odio eveniet excepturi itaque accusantium!
            </b-card-text>
            <div class="participant float-right mt-3">
              <b>Contributor : </b>
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
        <h4>Current Todos</h4>
      </b-col>
      <b-col md="12">
        <b-row>
          <b-col md="4" v-for="index in 3" :key="index">
            <b-card bg-variant="dark" text-variant="white" title="Todo Title">
              <b-card-text>
                Todo desc Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Porro nulla aliquid, laborum laboriosam ex aut soluta
                dolorum recusandae nostrum fugiat eos! Molestiae vero saepe non,
                distinctio nisi aperiam hic. Excepturi!.
                <br />
                <b>Status : </b>
                <div class="task-status">
                  <b-form-select
                    id="inline-form-custom-select-pref"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    :options="status"
                    :value="status[0]"
                    size="sm"
                  ></b-form-select>
                </div>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: "taskShow",
  data: () => {
    return {
      status: ["progress", "hold", "done"]
    };
  }
};
</script>
