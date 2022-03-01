<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: schools, isFindPending: isPending, queryInfo: info }"
      service="schools"
      :params="{ query }"
      watch="params"
    >
      <div>
        <SchoolFilter :skip="listSkip" :limit="listLimit" :queryInfo="info" @setSkip="setSkip"></SchoolFilter>
        <SchoolList v-if="!isPending" v-model="selectedSchool" :schools="schools" :isPending="isPending" @selected="handleSelected" />
        <info-panel v-model="drawer">
          <SchoolInfo v-if="getSchool(schools, selectedSchool)" :school="getSchool(schools, selectedSchool)" />
          <v-btn class="ml-5" rounded outlined color="primary" @click="editSchoolDialog = true"><v-icon color="primary">mdi-plus</v-icon>Edit School</v-btn>
          <SchoolDialog v-model="editSchoolDialog" :schoolId="selectedSchool" />
        </info-panel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import SchoolInfo from './SchoolInfo';
import InfoPanel from "../../other/InfoPanel.vue";
import SchoolList from './SchoolList.vue';
import SchoolFilter from './SchoolFilter.vue';
import SchoolDialog from '../SchoolDialog';


export default {
  name: 'view-schools',
  title: 'View Schools',
  components: {
    SchoolInfo,
    InfoPanel,
    SchoolList,
    SchoolFilter,
    SchoolDialog
  },
  data: () => ({
    selectedSchool: null,
    drawer: false,
    listLimit: 20,
    listSkip: 0,
    editSchoolDialog: false
  }),
  async mounted() {
    this.selectedSchool = this.$route.params.id
    this.drawer = true
  },
  computed: {
    query() {
      return {
        $limit: this.listLimit,
        $skip: this.listSkip,
        $sort: {
          name: 1,
        }
      }
    },
  },
  methods: {
    getSchool(schools, selectedSchool) {
      return schools.find(school => school._id === selectedSchool)
    },
    handleSelected(val) {
      this.selectedSchool = val
      this.drawer = true
    },
    setSkip(skip) {
      this.listSkip = skip
    },
    setYear(year) {
      this.yearSelect = year
    },
  }
};
</script>
