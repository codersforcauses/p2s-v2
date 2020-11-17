<template>
  <v-bottom-navigation
    v-show="checkMultiplePermissions"
    v-model="bottomNav"
    :background-color="$vuetify.theme.dark ? '#464646' : '#e0e0e0'"
    color="primary"
    app
    grow
    shift
  >
    <v-btn v-show="coach" value="coach" :to="{path: '/coach'}">
      <span>Coach</span>
      <v-icon>mdi-football</v-icon>
    </v-btn>

    <v-btn v-show="manager" value="manager" :to="{path: '/manager'}">
      <span>Regional Manager</span>
      <v-icon>mdi-account-tie</v-icon>
    </v-btn>

    <v-btn v-show="admin" value="admin" :to="{path: '/admin'}">
      <span>Administrator</span>
      <v-icon>mdi-shield-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      bottomNav: 'admin',
    };
  },
  computed: {
    ...mapState('auth', { user: 'user' }),
    coach() {
      return this.user?.coach?.is || true;
    },
    manager() {
      return this.user?.manager?.is || true;
    },
    admin() {
      return this.user?.admin?.is || true;
    },
    checkMultiplePermissions() {
      return (
        [this.coach, this.manager, this.admin].filter(value => value).length > 1
      );
    },
  },
};
</script>

<style scoped>
.v-bottom-navigation {
  box-shadow: none;
  -webkit-box-shadow: none;
}
</style>
