<template>
<h1>Create an event, {{ user.user.name }}</h1>

<div class="form-container">

  <form @submit.prevent="onSubmit">
    <label>Select a category: </label>
    <p>There are {{ categoriesLength }} categories.</p>
    <select v-model="event.category">
      <option
        v-for="option in categories"
        :value="option"
        :key="option"
        :selected="option === event.category"
      >{{ option }}</option>
    </select>

    <h3>Name & describe your event</h3>

    <label>Title</label>
    <input
      v-model="event.title"
      type="text"
      placeholder="Title"
    >

    <label>Description</label>
    <input
      v-model="event.description"
      type="text"
      placeholder="Description"
    />

    <h3>Where is your event?</h3>

    <label>Location</label>
    <input
      v-model="event.location"
      type="text"
      placeholder="Location"
    />

    <h3>When is your event?</h3>
    <label>Date</label>
    <input
      v-model="event.date"
      type="text"
      placeholder="Date"
    />

    <label>Time</label>
    <input
      v-model="event.time"
      type="text"
      placeholder="Time"
    />

    <button type="submit">Submit</button>
    <div>{{ $store.state.events }}</div>
  </form>

  <hr>

  {{ getEventById(123) }}

</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default {
  data () {
    return {
      event: this.createFreshEvent(),
    }
  },
  computed: {
    ...mapGetters('event', ['categoriesLength', 'getEventById']),
    ...mapState(['user', 'categories'])
  },
  methods: {
    createFreshEvent() {
      return {
        id: uuidv4(),
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: this.$store.state.user.user.name
      }
    },
    onSubmit() {
      this.$store.dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'EventDetails',
            params: { id: this.event.id }
          })
        .catch((error) => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error }
          });
        })
      })
    }
  },
}
</script>