<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: students, isFindPending: isPending, queryInfo: info }"
      service="students"
      :params="{ query }"
      watch="params"
    >
      <div>
        <StudentFilter
          :filterSchool="selectedSchool"
          :filterYear="selectedYear"
          @updateYear="selectedYear = $event"
          @updateSchool="selectedSchool = $event"
          :skip="listSkip"
          @setSkip="setSkip"
          :limit="listLimit"
          :queryInfo="info"/>
        <StudentList v-model="selectedStudent" @selected="setStudent" :students="students" :isPending="isPending" @close="closeDrawer" />
        <InfoPanel v-model="drawer">
          <StudentInfo v-if="selectedStudent" :student="selectedStudent" @close="closeDrawer"></StudentInfo>
          <v-btn class="ml-8" rounded outlined color="primary" @click="editStudentDialog = true"><v-icon color="primary">mdi-pencil</v-icon>Edit Student</v-btn>
          <StudentDialog v-if="selectedStudent" v-model="editStudentDialog" :studentId="selectedStudent._id" />
        </InfoPanel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import StudentList from './StudentList';
import StudentInfo from './StudentInfo';
import StudentFilter from './StudentFilter';
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
    StudentDialog
  },
  data() {
    return {
      selectedStudent: null,
      drawer: false,
      listLimit: 20,
      listSkip: 0,
      selectedSchool: '',
      selectedYear: null,
      editStudentDialog: false
    };
  },
  computed: {
    query() {
      return {
        $limit: this.listLimit,
        $skip: this.listSkip,
        $sort: {
          name: 1,
        },
        ...( this.selectedYear && {schoolYear: this.selectedYear} ),
        ...( this.selectedSchool && { school: this.selectedSchool }),
      }
    },
  },
  methods: {
    closeDrawer() {
      this.drawer = false
    },
    setSkip(skip) {
      this.listSkip = skip
    },
    setStudent(student) {
      this.selectedStudent = student;
      this.drawer = true;
    }
  },
  watch: {
    selectedStudent() {
      if(!this.selectedStudent) this.drawer = false
    },
    selectedYear() {
      this.listSkip = 0;
    },
    selectedSchool() {
      this.listSkip = 0;
    },
    drawer() {
      if(!this.drawer) {
        setTimeout(() => {
          this.selectedStudent = null;
        }, 50)
      }
    }
  }
};
</script>
