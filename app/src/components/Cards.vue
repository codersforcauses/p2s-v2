<template>
  <div class="layout-grid">
    <component v-for="card in visbleCards" :key="card.component" :is="card.component" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  
  data() {
    return {
      cards: [
        {component: 'user-card', permission: ['admin']},
        {component: 'session-card', permission: ['admin', 'coach']},
        {component: 'student-card', permission: ['admin', 'coach']},
        {component: 'school-card', permission: ['admin']},
      ]
    };
  },
  computed: {
    ...mapState('auth', { user: 'user' }),
    visbleCards() {
      const userPerms = []
      if(this.user.admin.is) userPerms.push('admin')
      if(this.user.coach.is) userPerms.push('coach')
      return this.cards.filter(i => i.permission.some(p => userPerms.includes(p)))
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
