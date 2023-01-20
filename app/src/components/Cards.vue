<template>
  <div class="layout-grid">
    <component v-for="card in visbleCards" :key="card[0]" :is="card[0]" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  
  data() {
    return {
      cards: [
        ['user-card', 'admin'],
        ['session-card', 'coach'],
        ['student-card', 'coach'],
        ['school-card', 'admin'],
      ]
    };
  },
  computed: {
    ...mapState('auth', { user: 'user' }),
    visbleCards() {
      return this.cards.filter(i => this.user.admin.is || (this.user.coach.is && i[1] === 'coach'))
    }
  },
  components: {
    'session-card': () => import('./Session/SessionCard'),
    'user-card': () => import('./User/UserCard'),
    'student-card': () => import('./Student/StudentCard'),
    'school-card': () => import('./School/SchoolCard'),
  },
};
</script>
