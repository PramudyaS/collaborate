<template>
  <b-col md="10" offset-md="1">
    <b-card
      no-body
      class="card-suggestion overflow-hidden"
      bg-variant="primary"
    >
      <b-row no-gutters class="text-center card-suggestion-content">
        <b-col md="2">
          <b-avatar
            src="https://placekitten.com/300/300"
            class="avatar"
          ></b-avatar>
        </b-col>
        <b-col md="3">
          <p class="mt-2 text-white">User Name</p>
        </b-col>
        <b-col offset-md="4">
          <b-btn variant="dark" size="sm" class="mt-1"
            ><span class="fa fa-plus"></span
          ></b-btn>
        </b-col>
      </b-row>
    </b-card>
  </b-col>
</template>
