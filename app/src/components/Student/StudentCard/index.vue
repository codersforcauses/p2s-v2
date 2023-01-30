<template>
  <Card title="Students">
    <template v-slot:content>
      <v-card-subtitle class="pa-0">Current students</v-card-subtitle>
      <FeathersVuexFind v-slot="{ items: students }" service="students" :params="{ query: {} }">
        <div class="text-h2 primary--text">{{ students.length }}</div>
      </FeathersVuexFind>
    </template>
    <template v-slot:actions>
      <v-btn text rounded color="primary" :to="{ name: 'view-students' }">View All</v-btn>
      <v-spacer></v-spacer>
      <v-btn text rounded color="primary" @click="studentDialog = true">
        <v-icon left>
          mdi-plus
        </v-icon>
        Create New</v-btn>
      <StudentDialog v-model="studentDialog" />
    </template>
  </Card>
</template>

<script>
import Card from '../../layout/Card.vue'
import StudentDialog from '../StudentDialog'

export default {
  components: {
    Card,
    StudentDialog
  },
  data() {
    return {
      studentDialog: false,
    };
  },
};
</script>
