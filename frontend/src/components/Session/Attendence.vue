<template>
  <v-card outlined rounded="lg" flat class="mx-4 my-6">
    <v-card-text class="pb-0">Students</v-card-text>
    <v-card-text v-if="!students.length">No Students Found</v-card-text>
    <v-list-item v-for="student in students" :key="student._id" two-line >
      <!-- <v-list-item-content>
        <v-list-item-title>Name: {{getEmergencyInfo.name}}</v-list-item-title>
        <v-list-item-subtitle>Num: {{getEmergencyInfo.num}}</v-list-item-subtitle>
      </v-list-item-content> -->
      <pre>{{JSON.stringify(student, null, 2)}}</pre>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    students: Array
  }
}
</script>