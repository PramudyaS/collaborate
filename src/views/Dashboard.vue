<template>
  <b-col>
    <b-row class="mt-3">
      <b-col>
        <b-breadcrumb class="breadcrumb">
          <b-breadcrumb-item href="#home">
            <b-icon
              icon="house-fill"
              scale="1.25"
              shift-v="1.25"
              aria-hidden="true"
            ></b-icon>
            Home
          </b-breadcrumb-item>
          <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
          <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
          <b-breadcrumb-item active>Baz</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
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
.card-project-shadow {
  border-style: dotted;
}

.breadcrumb {
  background: white;
}
</style>
