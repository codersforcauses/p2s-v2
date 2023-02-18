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
      snackBtnText: '',
      snackWithBtnText: '',
      snackWithButtons: false,
      timeout: -1,
    };
  },
  mounted() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      // && user-preference
    )
      this.$vuetify.theme.dark = true;
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
