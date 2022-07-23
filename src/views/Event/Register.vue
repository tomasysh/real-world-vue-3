<template>
  <p>Register for the event</p>
  <button type="button" @click="register">Register Me</button>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    register() {
      // Call to API
      // If registered then redirect to event details
      this.$router.push({
        name: 'EventDetails'
      });
      // this.$router.replace({
      //   name: 'EventDetails'
      // });
    }
  }
}
</script>