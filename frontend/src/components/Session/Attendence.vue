<template>
  <v-card flat class="mx-4 my-6">
    <v-card-text class="pb-0">Students</v-card-text>
    <v-card-text v-if="!students.length">No Students Found</v-card-text>
    <v-btn text color="primary" @click="studentAddDialog = true"><v-icon>mdi-plus</v-icon>Add Students</v-btn>
    <AddStudents v-model="studentAddDialog" :students="students" @update="updateAttending($event)" />
    <v-skeleton-loader type="list-item-two-line@10" :loading="!students">
    <v-list two-line subheader flat>
      <v-list-item-group multiple v-model="attended" color="primary">
        <template v-for="student in students">
          <div :key="student._id" class="d-flex align-center">
            <v-list-item class="px-0 px-sm-3">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    color="primary"
                  ></v-checkbox></v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="text--primary">{{ student.name }}</v-list-item-title>
                  <v-list-item-subtitle class="text--secondary">
                    Year {{ student.schoolYear }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>
            <v-btn depressed large :icon="!$vuetify.breakpoint.smAndUp" @click="openReport">
              <v-icon>mdi-file-edit</v-icon>
            </v-btn>
          </div>
        </template>
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import AddStudents from './AddStudents.vue'

export default {
  components: { AddStudents },
  props: {
    session: Object,
    students: Array,
    reports: Array,
    openReport: Function
  },
  data: () => ({
    attended: [],
    studentAddDialog: false
  }),
  methods: {
    ...mapActions('sessions', { updateSession: 'patch'}),
    updateAttending(students) {
      this.updateSession([this.session._id, students.map(student => student._id)])
    },
    getReport(studentId) {
      console.log(this.$props.reports);
      return this.reports.find(report => report.student === studentId)
    },
  }
}
</script>