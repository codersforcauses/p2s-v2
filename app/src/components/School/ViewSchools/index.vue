<template>
  <v-sheet rounded="xl" class="overflow-hidden">
    <BasicSearch @setSearch="setSearch" />
    <SchoolList v-if="schools" v-model="selectedSchool" :schools="filteredSchools" @selected="handleSelected" :loading="loading" />
    <InfoPanel v-model="drawer">
      <template v-slot:content>
        <SchoolInfo v-if="selectedSchool" :school="selectedSchool" />
      </template>
      <template v-slot:actions v-if="selectedSchool && adminUser">
        <v-btn class="ml-5" rounded outlined color="primary" @click="editSchoolDialog = true"><v-icon color="primary">mdi-pencil</v-icon>Edit School</v-btn>
        <SchoolDialog v-model="editSchoolDialog" :schoolId="selectedSchool._id" />
        <v-spacer></v-spacer>
        <v-btn color="error" class="mr-2" outlined rounded @click="deleteSchoolDialog = true"><v-icon>mdi-trash-can</v-icon>Delete School</v-btn>
        <DeleteDialog v-model="deleteSchoolDialog" :school="selectedSchool" />
      </template>
    </InfoPanel>
</v-sheet>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

import SchoolInfo from './SchoolInfo';
import InfoPanel from "../../other/InfoPanel.vue";
import SchoolList from './SchoolList.vue';
import DeleteDialog from "./DeleteDialog";
import SchoolDialog from '../SchoolDialog';
import BasicSearch from '../../forms/BasicSearch.vue';
import UserRoleMixin from '../../../utils/userRole.mixin';


export default {
  name: 'view-schools',
  title: 'View Schools',
  mixins: [ makeFindMixin({ service: 'schools', watch: true }), UserRoleMixin],
  components: {
    SchoolInfo,
    InfoPanel,
    SchoolList,
    SchoolDialog,
    DeleteDialog,
    BasicSearch
  },
  data: () => ({
    selectedSchool: null,
    drawer: false,
    editSchoolDialog: false,
    deleteSchoolDialog: false,
    searchFilter: '',
    loading: false
  }),
  async mounted() {
    if(this.$route.params.id) {
      this.drawer = true
    }
  },
  computed: {
    schoolsParams() {
      return {
        query: {
          $sort: {
            name: 1,
          }
        }
      }
    },
    filteredSchools() {
      return this.schools.filter(school =>
        this.searchFilter.split(' ').every(s =>
          `${school.name} ${school.address.suburb} ${school.address.state}`
          .toLowerCase().includes(s)
        ));
    },
  },
  methods: {
     closeDrawer() {
      this.drawer = false
    },
    handleSelected(school) {
      this.selectedSchool = school
      if(school) {
        this.drawer = true
      }
    },
    setYear(year) {
      this.yearSelect = year
    },
    setSearch(name) {
      this.searchFilter = name
    },
  },
  watch: {
    selectedSchool() {
      if(!this.selectedSchool){
        this.editSchoolDialog = false
        this.deleteSchoolDialog = false
        this.drawer = false
      }
    },
    drawer() {
      if(!this.drawer) {
        setTimeout(() => {
          this.selectedSchool = null
        }, 50)
      }
    }
  },
};
</script>
