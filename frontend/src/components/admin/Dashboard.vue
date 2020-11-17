<template>
  <div class="layout-grid">
    <no-coach />
    <component v-for="card in cards" :key="card" :is="card" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        'staff-card',
        'region-card',
        'program-card',
        'activity-card',
        'session-card',
        'student-card',
        'school-card',
      ],
    };
  },
  components: {
    'no-coach': () => import('./NoRegionCoachCard'),
    'staff-card': () => import('./StaffCard'),
    'region-card': () => import('./RegionCard'),
    'program-card': () => import('./ProgramCard'),
    'activity-card': () => import('./ActivityCard'),
    'session-card': () => import('./SessionCard'),
    'student-card': () => import('./StudentCard'),
    'school-card': () => import('./SchoolCard'),
  },
};
</script>
