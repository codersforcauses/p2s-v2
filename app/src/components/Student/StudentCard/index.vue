<template>
  <v-card flat rounded="xl">
    <v-card-subtitle>Current students</v-card-subtitle>
    <div class="d-flex pl-4">
      <FeathersVuexFind v-slot="{ items: students }" service="students" :params="{ query: {} }">
        <div>
          <div class="text-h2 primary--text text-center">{{ students.length }}</div>
          <div class="text-body-1 text-center">{{ studentText(students.length) }}</div>
        </div>
      </FeathersVuexFind>
    </div>
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Students</v-card-title>

    <v-card-text>View all the students on record</v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary" :to="{ name: 'view-students' }">View All</v-btn>
      <v-btn text rounded color="primary" @click="studentDialog = true">Create New</v-btn>
      <StudentDialog v-model="studentDialog" />
    </v-card-actions>
  </v-card>
</template>

<script>
import StudentDialog from '../StudentDialog'

export default {
  components: {
    StudentDialog
  },
  data() {
    return {
      studentDialog: false,
    };
  },
  methods: {
    studentText(num) {
      return num < 1 ? 'No Students Found' : `Student${num > 1 ? 's' : ''}`
    },
  }
};
</script>
