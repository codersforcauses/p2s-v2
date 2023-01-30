import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', { user: 'user' }),
    adminUser() {
      return this.user?.admin?.is;
    },
    coachUser() {
      return this.user?.coach?.is;
    }
  },
}