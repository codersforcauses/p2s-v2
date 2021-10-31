<template>
  <v-card outlined rounded="lg" flat class="mx-4 my-6">
    <v-card-text class="pb-0">Students</v-card-text>
    <v-card-text v-if="!students.length">No Students Found</v-card-text>
    <StudentList v-if="students" :students="students" />
  </v-card>
</template>

<script>
import StudentList from '../Student/ViewStudents/StudentList';

export default {
  components: {
    StudentList
  },
  props: {
    students: Array
  }
}
</script>