<template>
  <div class="d-flex flex-column align-center text-center">
    <div class="text-h5 text-sm-h4 text-md-h3 primary--text">{{ coaches.length }}</div>
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
