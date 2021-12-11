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
        <SchoolList v-if="!isPending" :schools="schools" @selected="setSchool" :isPending="isPending" @open="drawer = true" />
        <info-panel v-model="drawer">
           <school-info v-if="selectedSchool" :school="selectedSchool" />
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

export default {
  name: 'view-schools',
  title: 'View Schools',
  components: {
    SchoolInfo,
    InfoPanel,
    SchoolList,
    SchoolFilter
  },
  data() {
    return {
      selectedSchool: null,
      drawer: false,
      listLimit: 20,
      listSkip: 0,
    };
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
    }
  },
  methods: {
    setSkip(skip) {
      this.listSkip = skip
    },
    setYear(year) {
      this.yearSelect = year
    },
    setSchool(school) {
      this.selectedSchool = school;
      this.drawer = true;
    }
  }
};
</script>
