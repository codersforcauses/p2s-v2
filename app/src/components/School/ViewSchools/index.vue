<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: schools, isFindPending: isPending }"
      service="schools"
      :params="{ query }"
      watch="params"
    >
      <div>
        <SchoolList v-if="!isPending" v-model="selectedSchool" :schools="schools" :isPending="isPending" @selected="handleSelected" />
        <InfoPanel v-model="drawer">
          <SchoolInfo v-if="selectedSchool" :school="selectedSchool" />
          <v-card-actions v-if="selectedSchool">
            <v-btn class="ml-5" rounded outlined color="primary" @click="editSchoolDialog = true"><v-icon color="primary">mdi-pencil</v-icon>Edit School</v-btn>
            <SchoolDialog v-if="selectedSchool" v-model="editSchoolDialog" :schoolId="selectedSchool._id" />
            <v-spacer></v-spacer>
            <v-btn color="error" class="mr-2" outlined rounded @click="deleteSchoolDialog = true"><v-icon>mdi-trash-can</v-icon>Delete School</v-btn>
            <DeleteDialog v-model="deleteSchoolDialog" :school="selectedSchool" />
          </v-card-actions>
        </InfoPanel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import { mapActions } from 'vuex'

import SchoolInfo from './SchoolInfo';
import InfoPanel from "../../other/InfoPanel.vue";
import SchoolList from './SchoolList.vue';
import DeleteDialog from "./DeleteDialog";
import SchoolDialog from '../SchoolDialog';


export default {
  name: 'view-schools',
  title: 'View Schools',
  components: {
    SchoolInfo,
    InfoPanel,
    SchoolList,
    SchoolDialog,
    DeleteDialog
  },
  data: () => ({
    selectedSchool: null,
    drawer: false,
    editSchoolDialog: false,
    deleteSchoolDialog: false
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
    setYear(year) {
      this.yearSelect = year
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
