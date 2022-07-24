<template>
    <button :type="type" @click="onClick">
        <!-- <slot name="label" :caption="labelProps.caption" /> -->
        <slot name="label"/>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  inheritAttrs: false, // [REF] https://github.com/vuejs/core/issues/813
  props: {
    type: {
      type: String,
      default: 'submit'
    },
  },
  methods: {
    onClick() {
        this.$emit('click');
    }
  },
})
</script>