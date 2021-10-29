<template>
  <div class="d-flex flex-column">
    <div class="text-h5 primary--text">{{ session.location }}</div>
    <div>{{ session.type }}</div>
  </div>
</template>

<script>
export default {
  props: {
    session: Object
  }
}
</script>