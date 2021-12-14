<template>
  <v-card flat class="mx-4 my-6">
    <v-card-title class="pb-0">Students</v-card-title>
    <v-card-text v-if="!registeredStudents.length">No Students Found</v-card-text>
    <v-skeleton-loader type="list-item-two-line@10" :loading="!registeredStudents">
      <v-list two-line subheader flat>
        <v-card-subtitle v-show="registeredStudents.length" class="py-0">
          Tap student to mark attendence
        </v-card-subtitle>
        <v-list-item-group multiple color="primary">
          <template v-for="student in registeredStudents">
            <ListItem
              :key="student._id"
              :student="student"
              :isActive="studentsAttending.some(studentId => studentId === student._id)"
              :report="getReport(student._id)"
              @toggleStudentPresent="togglePresent($event)"
              @openReport="$emit('openReport', getReport($event))"
            />
          </template>
        </v-list-item-group>
        <v-btn text color="primary" @click="studentAddDialog = true"
          ><v-icon>mdi-plus</v-icon>Edit Students</v-btn
        >
        <AddStudents
          v-model="studentAddDialog"
          :session="session"
          @update="updateAttending($event)"
        />
      </v-list>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import AddStudents from './AddStudents';
import ListItem from './ListItem.vue';

export default {
  components: {
    AddStudents,
    ListItem,
  },
  props: {
    session: Object,
    registeredStudents: Array,
    reports: Array,
  },
  data: () => ({
    studentsAttending: [],
    studentAddDialog: false,
  }),
  mounted() {
    console.log('woot');
    this.studentsAttending = this.registeredStudents
      .map(student => student._id)
      .filter(studentId => {
        const studentReport = this.getReport(studentId);
        return studentReport?.attended === 'Present';
      });
  },
  methods: {
    ...mapActions('sessions', { updateSession: 'patch' }),
    ...mapActions('reports', { createReport: 'create', updateReport: 'patch' }),
    togglePresent(studentId) {
      const index = this.studentsAttending.findIndex(
        presentStudentId => studentId === presentStudentId,
      );
      if (index >= 0) this.studentsAttending.splice(index, 1);
      else this.studentsAttending.push(studentId);
      const report = this.getReport(studentId)
      this.updateReport([report._id, { attended: this.studentsAttending.some(id => studentId === id)? 'Present': 'SchoolAttended'}]);
    },
    updateAttending(students) {
      this.updateSession([this.session._id, { students }]);
      students.forEach(studentId => {
        if (!this.reports.some(report => report.student === studentId)) this.addReport(studentId);
      });
    },
    getReport(studentId) {
      return this.reports.find(report => report.student === studentId);
    },
    addReport(studentId) {
      this.createReport({
        session: this.session._id,
        student: studentId,
        attended: 'SchoolAttended',
      });
    },
  },
};
</script>
