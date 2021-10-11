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
    'session-card': () => import('./Session/SessionCard'),
    'staff-card': () => import('./Staff/StaffCard'),
    'student-card': () => import('./Student/StudentCard'),
    'school-card': () => import('./School/SchoolCard'),
  },
};
</script>
