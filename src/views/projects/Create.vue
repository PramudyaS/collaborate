<template>
  <transition name="slide-fade">
    <b-col md="4">
      <b-card>
        <b-card-text>
          <b-form-group label="Name">
            <b-form>
              <b-form-input
                type="text"
                required
                v-model="form.name"
              ></b-form-input>
            </b-form>
          </b-form-group>
          <b-form-group label="Description">
            <b-form-textarea
              id="textarea"
              v-model="form.description"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group label="Date Start">
            <b-form-datepicker
              v-model="form.date_start"
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group label="Date End">
            <b-form-datepicker
              v-model="form.date_end"
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>
        </b-card-text>
        <b-button variant="primary" @click="storeProject">Done</b-button>
        <b-button
          variant="danger"
          style="margin-left:10px"
          @click="cancelCreate"
          >Cancel</b-button
        >
      </b-card>
    </b-col>
  </transition>
</template>

<script>
import ProjectService from "@/api-services/project_services.js";
export default {
  name: "ProjectCreate",
  data: () => {
    return {
      form: {
        name: null,
        description: null,
        date_start: null,
        date_end: null,
        creator_id: localStorage.getItem("user-id")
      }
    };
  },
  methods: {
    cancelCreate() {
      this.$router.push({ name: "dashboard" });
    },

    async storeProject() {
      await ProjectService.store(this.form)
        .then(response => {
          if (response.status === 200) {
            this.$bvToast.toast(response.data.message, {
              title: `Success`,
              variant: "success",
              solid: true
            });
            this.$emit("updateProject", this.form);
          }
        })
        .catch(error => {
          this.$bvToast.toast(error, {
            title: `Failed`,
            variant: "error",
            solid: true
          });
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
