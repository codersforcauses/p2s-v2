<template>
  <div class="layout-grid">
    <component v-for="card in cards" :key="card" :is="card" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        'session-card',
        'student-card',
        // 'staff-card',
        // 'region-card',
        // 'program-card',
        // 'activity-card',
        // 'school-card',
      ],
    };
  },
  components: {
    'session-card': () => import('../SessionCard'),
    'student-card': () => import('../StudentCard'),
    // 'staff-card': () => import('./StaffCard'),
    // 'region-card': () => import('./RegionCard'),
    // 'program-card': () => import('./ProgramCard'),
    // 'activity-card': () => import('./ActivityCard'),
    // 'school-card': () => import('./SchoolCard'),
  },
};
</script>
