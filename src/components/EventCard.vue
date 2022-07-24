<template>
    <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">    
      <div class="event-card">
        <span>Event #{{ $route.params.id }}</span>
        <span>@{{ event.time }} on {{ event.date }}</span>
        <h4>{{ event.title }}</h4>
        <BaseButton @click="open">
        <!-- <template v-slot:label="{ caption }">
          {{ caption }}
        </template> -->
          <template v-slot:label>
            VIEW DETAILS
          </template>
        </BaseButton>
      </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import BaseButton from '@/components/BaseButton.vue';

export default defineComponent({
  components: {
    BaseButton
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    open() {
      console.log('DEMO CUSTOM BASE_BUTTON')
    }
  }
})
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>