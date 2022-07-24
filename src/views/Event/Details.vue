<template>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core"
import { Event } from "@/shared/models/event.model"

export default defineComponent({
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true
    }
  },
})
</script>