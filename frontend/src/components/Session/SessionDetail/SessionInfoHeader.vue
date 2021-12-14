<template>
  <div class="d-flex justify-space-between align-center mx-10">
    <DateView :date="session.date" />
    <v-divider inset vertical />
    <TimeView :date="session.date" />
    <v-divider inset vertical />
    <ActivityView :session="session" />
    <v-divider inset vertical />
    <CoachesView :session="session" />
  </div>
</template>

<script>
import DateView from '../DateView.vue';
import TimeView from '../TimeView.vue';
import ActivityView from '../ActivityView.vue';
import CoachesView from '../CoachesView.vue';

export default {
  props: {
    session: Object,
  },
  components: {
    DateView,
    TimeView,
    ActivityView,
    CoachesView,
  },
};
</script>

<style></style>
