<template>
  <v-card flat rounded="xl">
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Sessions</v-card-title>

    <v-card-text>
      View all the sessions on file
      <br />Create a new session to be used in lessons or programs
    </v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary">View All</v-btn>
      <v-btn text rounded color="primary" @click="sessionDialog = true">Create New</v-btn>
      <!-- <new-session v-model="sessionDialog" /> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      sessionDialog: false,
    };
  },
};
</script>
