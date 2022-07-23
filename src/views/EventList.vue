<template>
  <div>
    <h1>Events for Good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        v-if="page != 1"
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 }}"
        rel="prev"
        >
        &#60; Prev Page
      </router-link>

      <router-link
        id="page-next"
        v-if="hasNextPage"
        :to="{ name: 'EventList', query: { page: page + 1 }}"
        rel="next"
        >
        Next Page &#62;
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { watchEffect } from 'vue';

import { defineComponent } from '@vue/runtime-core';

import EventCard from '../components/EventCard.vue';

export default defineComponent({
  name: 'EventList',
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('fetchEvents')
      .catch((error) => {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error }
        })
      });
  },
  computed: {
    events() {
      return this.$store.state.events;
    }
  }
 })
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>