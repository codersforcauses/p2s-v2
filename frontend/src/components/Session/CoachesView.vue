<template>
  <div class="d-flex flex-column align-center pr-5">
    <div class="text-h3 primary--text">{{ coaches.length }}</div>
    <div>{{ coachText }}</div>
  </div>
</template>

<script>
export default {
  props: {
    session: Object,
  },
  computed: {
    coaches() {
      return this.session.coaches
    },
    coachText() {
      if(!this.coaches || this.coaches.length < 1) return 'Coaches Assigned'
      return `Coach${this.coaches.length > 1 ? 'es' : ''} Assigned`
    }
  }
};
</script>
