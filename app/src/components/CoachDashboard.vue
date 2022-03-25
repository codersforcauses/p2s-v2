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
      ],
    };
  },
  components: {
    'session-card': () => import('./Session/SessionCard'),
    'student-card': () => import('./Student/StudentCard'),
  },
};
</script>
