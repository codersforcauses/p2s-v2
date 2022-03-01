<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: schools, isFindPending: isPending, queryInfo: info }"
      service="schools"
      :params="{ query }"
      watch="params"
    >
      <div>
        <SchoolFilter   :queryInfo="info" :limit="listLimit" :skip="listSkip" @setSkip="setSkip"></SchoolFilter>
        <SchoolList v-if="!isPending" v-model="selectedSchool" :schools="schools" :isPending="isPending" @selected="handleSelected" />
        <info-panel v-model="drawer">
          <SchoolInfo v-if="selectedSchool" :school="selectedSchool" />
          <v-btn class="ml-5" rounded outlined color="primary" @click="editSchoolDialog = true"><v-icon color="primary">mdi-plus</v-icon>Edit School</v-btn>
          <SchoolDialog v-if="selectedSchool" v-model="editSchoolDialog" :schoolId="selectedSchool._id" />
        </info-panel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import { mapActions } from 'vuex'

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
    if(this.$route.params.id) {
      this.selectedSchool = await this.getSchool(this.$route.params.id)
      this.drawer = true
    }
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
    ...mapActions('schools', { getSchool: 'get' }),
    closeDrawer() {
      this.drawer = false
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
  },
  watch: {
    selectedSchool() {
      if(!this.selectedSchool) this.drawer = false
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
