<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: students, isFindPending: isPending }"
      service="students"
      :params="{ query }"
      watch="params"
    >
      <div>
        <div :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
          <div class="d-flex justify-space-between align-center">
            <v-btn icon disabled class="ml-3"><v-icon>mdi-magnify</v-icon></v-btn>
            <!-- <v-text-field outlined single-line hide-details class="pa-3" style="border-radius: 50px;"></v-text-field> -->
            <v-select v-model="yearSelect" :items="years" item-text="text" item-value="value" label="School Year"></v-select>
            <div class="mb-2 mr-1 ml-auto d-flex align-center justify-space-between" style="width: 10rem;">
              <v-btn icon color="primary" :disabled="skip === 0" @click="skip -= limit">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
          <span>Page {{skip/limit+1}}</span>
          <v-btn icon color="primary" :disabled="skip + limit >= info.total" @click="skip += limit">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
        <StudentList :students="students" :isPending="isPending" />
        <info-panel :open="drawer">
          <student-info v-if="!isPending" :student="selectedStudent"></student-info>
        </info-panel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import StudentList from './StudentList';
import StudentInfo from './StudentInfo';
import InfoPanel from '../../other/InfoPanel.vue';

export default {
  name: 'view-students',
  title: 'View Students',
  components: {
    StudentList,
    StudentInfo,
    InfoPanel,
  },
  data() {
    return {
      selectedStudent: null,
      drawer: false,
      limit: 10,
      skip: 0,
      yearSelect: null,
      years: [
        { text: "All Years", value: null },
        { text: "Year 8", value: 8 },
        { text: "Year 9", value: 9 },
        { text: "Year 10", value: 10 },
        { text: "Year 11", value: 11 },
        { text: "Year 12", value: 12 },
      ]
    };
  },
  computed: {
    query() {
      return {
        $limit: this.limit,
        $skip: this.skip,
        $sort: {
          name: 1,
        },
        ...( this.yearSelect && {schoolYear: this.yearSelect})
      }
    }
  }
};
</script>
