<template>
  <v-card flat tile class="py-sm-12">
    <v-card-title class="text-h6">{{school.name}}</v-card-title>
    <v-card-text class="pa-0 mt-sm-4">
      <v-list-item three-line class="px-2 px-sm-4">
        <v-list-item-content class="py-0">
          <v-list-item-title>Contact</v-list-item-title>
          <v-list-item-subtitle>{{school.contact.name}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{school.contact.phoneNumber}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{school.contact.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item three-line class="px-2 px-sm-4">
        <v-list-item-content class="py-0">
          <v-list-item-title>Address</v-list-item-title>
          <v-list-item-subtitle>{{school.address.street}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{`${school.address.suburb}, ${school.address.state} ${school.address.postcode}`}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    school: Object,
  },
  computed: {
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
  },
};
</script>
