<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
          <router-link :to="{ name: 'EventDetails' }">Details</router-link>
          |
          <router-link :to="{ name: 'EventRegister' }">Register</router-link>
          |
          <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event.event" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['id'],
  created() {
    this.$store.dispatch('event/fetchEvent', this.id)
      .catch((error) => {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error }
        });
    });
  },
  computed: {
    // event() {
    //   return this.$store.state.event;
    // }
    ...mapState(['event'])
  }
}
</script>