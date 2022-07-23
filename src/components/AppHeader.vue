<template>
  <div class="app-header">
    <button v-show="loggedIn">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  name: 'AppHeader',
  data() {
    return {
      loggedIn: false
    }
  }
})
</script>

<style scoped>
.app-header {
  min-height: 40px;
  padding: 0.2em 1em;
  background: white;
}
button {
  float: right;
}
</style>