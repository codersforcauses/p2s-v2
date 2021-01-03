<template>
  <v-card flat rounded="xl">
    <region-image />

    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Schools</v-card-title>
    <v-card-text>
      View all the schools on file
      <br />Create a new school to be used in lessons or programs
    </v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary">View All</v-btn>
      <v-btn text rounded color="primary" @click="schoolDialog = true">Create New</v-btn>
      <!-- <new-school v-model="schoolDialog" /> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import RegionImage from './RegionImage'

export default {
  components: {
    RegionImage
  },
  data() {
    return {
      schoolDialog: false,
    };
  },

};
</script>
