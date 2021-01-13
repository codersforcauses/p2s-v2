<template>
  <v-card flat tile height="100%" class="py-sm-12">
    <v-card-text height="100%" class="pa-0 mt-sm-4">
      <v-list-item three-line class="px-2 px-sm-4">
        <v-list-item-content class="py-0">
          <v-list-item-title class="text-h6">{{school.name}}</v-list-item-title>
          <v-list-item-subtitle>{{school.email}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{school.phoneNumber}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list subheader dense flat>
        <v-subheader>Address</v-subheader>
        <v-list-item three-line class="px-2 px-sm-4">
          <v-list-item-content class="py-0">
            <v-list-item-subtitle>{{school.address.street}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{`${school.address.suburb}, ${school.address.state}`}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{school.address.postcode}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    school: {
      type: Object,
      default: () => ({
      })
    }
  },
  computed: {
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
  },
};
</script>

<style scoped>
.coach-docs {
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.75rem;
}
.wwc {
  grid-column: 1 / span 2;
}

@media only screen and (min-width: 960px) {
  .coach-docs {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 1rem;
  }
  .wwc {
    grid-column: 1;
  }
}
</style>
