<template>
  <p>Edit the event</p>
</template>

<script>

export default {
  props: ['event'],
  data: () => {
    return {
      unsavedChanges: true
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.unsavedChanges) {
      const confirmLeave = window.confirm('Do you really want ot leave? You have unsaved changes.');
      confirmLeave ? next() : next(false);
    } else {
      next();
    }
  }
}
</script>