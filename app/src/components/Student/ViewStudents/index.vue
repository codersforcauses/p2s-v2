<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: students, isFindPending: isPending, queryInfo: info }"
      service="students"
      :params="{ query }"
      watch="params"
    >
      <div>
        <StudentFilter :skip="listSkip" @setSkip="setSkip" :limit="listLimit" @setYear="setYear" :queryInfo="info"/>
        <StudentList :students="students" @selected="setStudent" :isPending="isPending" @open="drawer = true" />
        <info-panel v-model="drawer">
          <student-info v-if="!isPending" :student="selectedStudent"></student-info>
        </info-panel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import StudentList from './StudentList';
import StudentInfo from './StudentInfo';
import StudentFilter from './StudentFilter';
import InfoPanel from '../../other/InfoPanel.vue';

export default {
  name: 'view-students',
  title: 'View Students',
  components: {
    StudentList,
    StudentInfo,
    StudentFilter,
    InfoPanel,
  },
  data() {
    return {
      selectedStudent: null,
      drawer: false,
      listLimit: 20,
      listSkip: 0,
      yearSelect: null
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
        ...( this.yearSelect && {schoolYear: this.yearSelect})
      }
    },
  },
  methods: {
    setSkip(skip) {
      this.listSkip = skip
    },
    setYear(year) {
      this.yearSelect = year
    },
    setStudent(student) {
      this.selectedStudent = student;
      this.drawer = true;
    }
  },
  watch: {
    yearSelect() {
      this.skip = 0;
    }
  }
};
</script>
