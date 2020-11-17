<template>
  <v-card flat rounded="xl">
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Programs</v-card-title>

    <v-card-text>
      View all the created programs
      <br />Create a new program for coaches to use
    </v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary">View All</v-btn>
      <v-btn text rounded color="primary" @click="programDialog = true">Create New</v-btn>
      <!-- <new-program v-model="programDialog" /> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      programDialog: false,
    };
  },
};
</script>
