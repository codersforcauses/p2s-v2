<template>
  <v-app id="app">
    <v-snackbar v-model="snackWithButtons" left bottom rounded="pill" :timeout="timeout">
      {{ snackWithBtnText }}
      <template #action="{ attrs }">
        <v-btn dark text color="info" @click.native="refreshApp">{{ snackBtnText }}</v-btn>
        <v-btn color="warning" icon v-bind="attrs" @click="snackWithButtons = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      refreshing: false,
      registration: null,
      snackBtnText: '',
      snackWithBtnText: '',
      snackWithButtons: false,
      timeout: -1,
    };
  },
  created() {
    // // Listen for swUpdated event and display refresh snackbar as required.
    // document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    // // Refresh all open app tabs when a new service worker is installed.
    // navigator.serviceWorker.addEventListener('controllerchange', () => {
    //   if (this.refreshing) return;
    //   this.refreshing = true;
    //   window.location.reload();
    // });
  },
  watch: {
    // eslint-disable-next-line func-names
    // '$vuetify.theme.dark': function(val) {
    // cookieStorage.setItem('dark', `${val}`);
    // },
  },
  mounted() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      // && user-preference
    )
      this.$vuetify.theme.dark = true;
  },
  methods: {
    // showRefreshUI(e) {
    //   // Display a snackbar inviting the user to refresh/reload the app due
    //   // to an app update being available.
    //   // The new service worker is installed, but not yet active.
    //   // Store the ServiceWorkerRegistration instance for later use.
    //   this.registration = e.detail;
    //   this.snackBtnText = 'Refresh';
    //   this.snackWithBtnText = 'New version available!';
    //   this.snackWithButtons = true;
    // },
    // refreshApp() {
    //   this.snackWithButtons = false;
    //   // Protect against missing registration.waiting.
    //   if (!this.registration || !this.registration.waiting) {
    //     return;
    //   }
    //   this.registration.waiting.postMessage('skipWaiting');
    // },
  },
};
</script>

<style>
:root {
  --thiccness: 1.25rem;
}
::selection {
  background-color: var(--v-primary-lighten4);
  color: #2f2f2f;
}
.serif {
  font-family: 'Martel';
}
</style>
