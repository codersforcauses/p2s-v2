<template>
  <v-sheet rounded="xl" class="py-3">
    <BasicSearch @setSearch="setSearch" />
    <StudentList v-model="selectedStudent" @selected="setStudent" :students="filteredStudents" :loading="isFindStudentsPending" @close="closeDrawer" />
    <InfoPanel v-model="drawer">
      <StudentInfo v-if="selectedStudent" :student="selectedStudent" @close="closeDrawer"></StudentInfo>
      <v-card-actions v-if="selectedStudent">
        <v-btn rounded outlined color="primary" @click="editStudentDialog = true"><v-icon color="primary">mdi-pencil</v-icon>Edit Student</v-btn>
        <StudentDialog v-if="selectedStudent" v-model="editStudentDialog" :studentId="selectedStudent._id" />
        <v-spacer></v-spacer>
        <v-btn color="error" class="mr-2" rounded outlined @click="deleteStudentDialog = true"><v-icon>mdi-trash-can</v-icon>Delete Student</v-btn>
        <DeleteDialog v-model="deleteStudentDialog" :student="selectedStudent" />
      </v-card-actions>
    </InfoPanel>
  </v-sheet>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

import StudentList from './StudentList';
import StudentInfo from './StudentInfo';
import DeleteDialog from './DeleteDialog';
import InfoPanel from '../../other/InfoPanel.vue';
import StudentDialog from '../StudentDialog';
import BasicSearch from '../../forms/BasicSearch.vue';

export default {
  name: 'view-students',
  title: 'View Students',
  mixins: [ 
    makeFindMixin({ service: 'students', watch: true }),
  ],
  components: {
    StudentList,
    StudentInfo,
    InfoPanel,
    StudentDialog,
    DeleteDialog,
    BasicSearch
  },

  data() {
    return {
      selectedStudent: null,
      drawer: false,
      selectedSchool: '',
      searchFilter: '',
      selectedYear: null,
      editStudentDialog: false,
      deleteStudentDialog: false,
    };
  },

  computed: {
    filteredStudents() {
      return this.students.filter(i =>
        this.searchFilter.split(' ').every(s =>
          `${i.name} ${i.schoolYear}`
          .toLowerCase().includes(s)
        ));
    },
    studentsParams() {
      return { 
        query: {
          $sort: {
            name: 1,
          },
          ...( this.selectedYear && { schoolYear: this.selectedYear }),
          ...( this.selectedSchool && { school: this.selectedSchool }),
        }
      }
    }
  },
  methods: {
    closeDrawer() {
      this.drawer = false
    },
    setStudent(student) {
      this.selectedStudent = student;
      this.drawer = true;
    },
    setSearch(name) {
      this.searchFilter = name
    },
  },
  watch: {
    selectedStudent() {
      if(!this.selectedStudent) {
        this.editStudentDialog = false
        this.deleteStudentDialog = false
        this.drawer = false
      }
    },
    drawer() {
      if(!this.drawer) {
        setTimeout(() => {
          this.selectedStudent = null;
        }, 50)
      }
    },
  }
};
</script>
