<template>
  <v-skeleton-loader type="list-item-three-line@10" :loading="loading">
    <v-list-item @click="openCreateDialog">
      <v-icon color="primary">mdi-plus</v-icon>
      <v-list-item-subtitle class="ml-3 primary--text">Add Student</v-list-item-subtitle>
      <StudentDialog v-model="studentDialog" />
    </v-list-item>
    <v-list three-line subheader>
      <v-list-item-group v-if="students.length > 0" v-model="selectedStudent" color="primary">
        <v-list-item v-for="student in students" :key="student._id" :value="student">
          <v-list-item-content>
            <v-list-item-title class="text--primary">{{ student.name }}</v-list-item-title>
              <v-list-item-subtitle v-if="schools" class="text--secondary">{{ getSchool(student.school).name }}</v-list-item-subtitle>
            <v-list-item-subtitle class="text--secondary">Year {{ student.schoolYear }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item v-else>
        No Students Found
      </v-list-item>
    </v-list>
  </v-skeleton-loader>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'
import StudentDialog from '../StudentDialog';

export default {
  name: "student-list",
  title: "Student List",
  mixins: [ 
    makeFindMixin({ service: 'schools', watch: true }),
  ],
  components: {
    StudentDialog,
  },
  props: {
    value: Object,
    students: Array,
    loading: Boolean
  },
  data: () => ({
    studentDialog: false
  }),
  computed: {
    schoolsParams() {
      return { query: {
        _id: { $in: this.students.map(stud => stud.school )}
      }}
    },
    selectedStudent: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('selected', val)
      }
    }
  },
  methods: {
    getSchool(id) {
      return this.schools.find(school => school._id === id)
    },
    openCreateDialog() {
      this.selectedSession = null
      this.studentDialog = true
    },
  }
}
</script>