<template>
  <b-col>
    <div class="header">
      <b-row>
        <b-col md="12">
          <h3>Task Detail</h3>
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
  </b-col>
</template>
