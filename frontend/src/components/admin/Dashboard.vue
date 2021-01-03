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
        'staff-card',
        'session-card',
        'student-card',
        'school-card',
      ],
    };
  },
  components: {
    'session-card': () => import('../SessionCard'),
    'staff-card': () => import('./StaffCard'),
    'student-card': () => import('../StudentCard'),
    'school-card': () => import('./SchoolCard'),
  },
};
</script>
