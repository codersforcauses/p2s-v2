<template>
  <v-sheet rounded="xl" class="py-3">
    <StudentFilter
      :filterSchool="selectedSchool"
      :filterYear="selectedYear"
      @updateYear="selectedYear = $event"
      @updateSchool="selectedSchool = $event" />
    <StudentList v-model="selectedStudent" @selected="setStudent" :students="students" :loading="loading" @close="closeDrawer" />
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
import StudentList from './StudentList';
import StudentInfo from './StudentInfo';
import StudentFilter from './StudentFilter';
import DeleteDialog from './DeleteDialog';
import InfoPanel from '../../other/InfoPanel.vue';
import StudentDialog from '../StudentDialog';

export default {
  name: 'view-students',
  title: 'View Students',
  components: {
    StudentList,
    StudentInfo,
    StudentFilter,
    InfoPanel,
    StudentDialog,
    DeleteDialog
  },

  data() {
    return {
      selectedStudent: null,
      drawer: false,
      selectedSchool: '',
      selectedYear: null,
      editStudentDialog: false,
      deleteStudentDialog: false,
      loading: false
    };
  },

  computed: {
    query() {
      return {
        $sort: {
          name: 1,
        },
        ...( this.selectedYear && {schoolYear: this.selectedYear} ),
        ...( this.selectedSchool && { school: this.selectedSchool }),
      }
    },
    students() {
      const { Student } = this.$FeathersVuex.api;
      const { data } = Student.findInStore({ query: this.query });
      return data;
    },
    schoolIds() {
      return this.students.reduce((a, student) => {
        if (student.school && !a.includes(student.school)) {
          a.push(student.school);
        }
        return a;
      }, []);
    },
  },
  methods: {
    closeDrawer() {
      this.drawer = false
    },
    setStudent(student) {
      this.selectedStudent = student;
      this.drawer = true;
    },
    async loadStudents() {
      const { Student } = this.$FeathersVuex.api;
      await this.$try(Student.find({
        query: {
          _id: { $nin: this.students.map(s => s._id) },
          ...this.query
        },
      }));
    },
    async loadSchools() {
      const { School } = this.$FeathersVuex.api;
      const { data: existing } = School.findInStore({
        query: { _id: { $in: this.schoolIds } },
      });
      const missingIds = this.schoolIds.filter((id) => !existing.some(s => s._id === id));
      if (!missingIds.length) return;
      await this.$try(School.find({
        query: { _id: { $in: missingIds } },
      }));
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
    query: {
      handler() {
        this.loadStudents();
      },
      immediate: true,
    },
    schoolIds: {
      handler() {
        this.loadSchools();
      },
      immediate: true,
    },
  },
};
</script>
