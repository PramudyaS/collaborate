<template>
  <b-toast id="example-toast" :title="title" visible auto-hide-delay="5000">
    {{ message }}
  </b-toast>
</template>

<script>
export default {
  name: "AlertComponent",
  props: {
    message: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    }
  }
};
</script>
