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
    'staff-card': () => import('./StaffCard'),
    'session-card': () => import('./SessionCard'),
    'student-card': () => import('./StudentCard'),
    'school-card': () => import('./SchoolCard'),
  },
};
</script>
