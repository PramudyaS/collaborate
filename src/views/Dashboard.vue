<template>
  <b-col>
    <div class="header">
      <b-row>
        <b-col>
          <h3>My Projects</h3>
        </b-col>
        <b-col>
          <div class="float-right">
            <b-dropdown id="dropdown-1" text="Filter" class="m-md-2">
              <b-dropdown-item>Latest</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-col>
      </b-row>
    </div>
    <ProjectList />
  </b-col>
</template>

<script>
import ProjectList from "./projects/Index";

export default {
  name: "Dashboard",
  components: {
    ProjectList
  }
};
</script>

<style scoped>
.header {
  padding-bottom: 20px;
  padding-top: 20px;
}
.card-project-shadow {
  border-style: dotted;
}
</style>
