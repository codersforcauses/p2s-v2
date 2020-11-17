<template>
  <v-card flat rounded="xl">
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Students</v-card-title>

    <v-card-text>View all the students on record</v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary">View All</v-btn>
      <v-btn text rounded color="primary" @click="studentDialog = true">Create New</v-btn>
      <!-- <new-student v-model="studentDialog" /> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      studentDialog: false,
    };
  },
};
</script>
