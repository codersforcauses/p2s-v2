<template>
  <v-app-bar flat app height="64">
    <v-btn v-if="$route.name !== 'dashboard'" class="mt-2 mr-2" icon large @click="$router.push('/')">
      <v-icon color="primary">
        mdi-home
      </v-icon>
    </v-btn>

    <v-divider inset vertical class="mr-3" v-show="isMobile" />

    <v-toolbar-title class="mt-2 ml-0 text-capitalize text-h5">{{ title }}</v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        :text="$vuetify.breakpoint.mdAndUp"
        :icon="$vuetify.breakpoint.smAndDown"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-theme-light-dark</v-icon>
        <span v-show="$vuetify.breakpoint.mdAndUp">{{ theme }} Theme</span>
      </v-btn>

      <v-btn
        :text="$vuetify.breakpoint.mdAndUp"
        :icon="$vuetify.breakpoint.smAndDown"
        @click="$router.push('/settings')"
      >
        <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-cog</v-icon>
        <span v-show="$vuetify.breakpoint.mdAndUp">Settings</span>
      </v-btn>

      <v-btn
        :text="$vuetify.breakpoint.mdAndUp"
        :icon="$vuetify.breakpoint.smAndDown"
        @click="logout"
      >
        <span v-show="$vuetify.breakpoint.mdAndUp">Logout</span>
        <v-icon :right="$vuetify.breakpoint.mdAndUp">mdi-logout</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'Light' : 'Dark';
    },
    isMobile() {
      return navigator.userAgent.match(
        /(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i,
      );
    },
    title() {
      return this.$route.name.split("-").join(" ")
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      window.location.reload();
    },
  },
};
</script>

<style scoped></style>
