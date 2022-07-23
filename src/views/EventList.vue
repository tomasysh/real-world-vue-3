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
import { watchEffect } from 'vue';
import EventService from '@/services/EventService';
import EventCard from '@/components/EventCard.vue';

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  props: ['page'],
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
    }
  },
  created() {
    watchEffect(() => {
      this.events = null;
      EventService.getEvents(2, this.page)
        .then((response) => {
          console.log('response', response);
          this.events = response.data;
          this.totalEvents = response.headers['x-total-count']
        })
        .catch((error) => {
          this.$router.push({ name: 'NetworkError' })
        });
    });
  },
}
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