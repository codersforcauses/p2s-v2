<template>
  <v-speed-dial bottom right fixed v-model="fab" transition="scale-transition">
    <template v-slot:activator>
      <v-btn fab depressed v-model="fab" color="primary" :class="viewportWidth">
        <v-icon v-if="!fab" title="Forms" :color="iconColor">mdi-file-document</v-icon>
        <v-icon v-else :color="iconColor">mdi-close</v-icon>
      </v-btn>
    </template>
    <v-btn fab depressed small color="green" :class="viewportWidth">RespecT</v-btn>
    <v-btn fab depressed small color="indigo" :class="viewportWidth">Pay</v-btn>
    <v-btn fab depressed small color="red" :class="viewportWidth">F to</v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
    };
  },
  computed: {
    viewportWidth() {
      return this.$vuetify.breakpoint.mdAndDown ? 'mobile' : 'desktop';
    },
    iconColor() {
      return this.$vuetify.theme.dark ? '#272727' : '#ebebeb';
    },
  },
};
</script>

<style scoped>
.mobile {
  bottom: 47px !important;
  right: -10px !important;
}
.desktop {
  bottom: 47px !important;
  right: -7px !important;
}
</style>
