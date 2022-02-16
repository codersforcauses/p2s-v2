<template>
  <v-card flat class="mx-4 my-6">
    <v-card-title class="pb-0">Students</v-card-title>
    <v-card-text v-if="!registeredStudents.length">No Students Found</v-card-text>
    <v-skeleton-loader type="list-item-two-line@10" :loading="!registeredStudents">
      <v-list two-line subheader flat>
        <v-card-subtitle v-show="registeredStudents.length" class="py-0">
          Select student to mark attendence
        </v-card-subtitle>
        <v-list-item-group multiple color="primary">
          <template v-for="student in registeredStudents">
            <ListItem
              :key="student._id"
              :student="student"
              :report="getReport(student._id)"
              @openReport="$emit('openReport', getReport($event))"
              @openInfo="$emit('openInfo', $event)"
            />
          </template>
        </v-list-item-group>
        <v-btn text color="primary" @click="studentAddDialog = true"
          ><v-icon>mdi-plus</v-icon>Edit Students</v-btn
        >
        <AssignStudents
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
import AssignStudents from './AssignStudents';
import ListItem from './ListItem.vue';

export default {
  components: {
    AssignStudents,
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
  methods: {
    ...mapActions('sessions', { updateSession: 'patch' }),
    ...mapActions('reports', { createReport: 'create' }),
    updateAttending(students) {
      this.updateSession([this.session._id, { students }]);
      students.forEach((studentId) => {
        if (!this.reports.some((report) => report.student === studentId)) this.addReport(studentId);
      });
    },
    getReport(studentId) {
      return this.reports.find((report) => report.student === studentId);
    },
    addReport(studentId) {
      this.createReport({
        session: this.session._id,
        student: studentId,
        attended: 'SchoolAttended',
        matrixResults: {
          autonomy: {
            coping: {
              value: -1,
            },
            confidence: {
              value: -1,
            },
          },
          attitude: {
            responsible: {
              value: -1,
            },
            tolerannce: {
              value: -1,
            },
            enthusiasm: {
              value: -1,
            },
            learning: {
              value: -1,
            },
          },
          communication: {
            verbal: {
              value: -1,
            },
            listening: {
              value: -1,
            },
            responsivness: {
              value: -1,
            },
          },
          thinking: {
            solving: {
              value: -1,
            },
          },
        },
        notes: ''
      });
    },
  },
};
</script>
