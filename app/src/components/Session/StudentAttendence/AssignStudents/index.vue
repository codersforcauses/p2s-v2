<template>
  <v-dialog
    scrollable
    max-width="520"
    v-model="showDialog"
    content-class="rounded-xl"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    style="position: relative;"
  >
    <v-card flat rounded="xl">
      <v-toolbar flat>
        <v-toolbar-title class="text-h6">Edit Students</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <StudentFilter
        :filterSchool="selectedSchool"
        :filterYear="selectedYear"
        @updateYear="selectedYear = $event"
        @updateSchool="selectedSchool = $event"
      />
      <v-card-text>
        <FeathersVuexFind
          v-slot="{ items: students }"
          service="students"
          :params="{ query }"
          watch="params"
        >
          <StudentList :session="session" :students="students" @update="$emit('update', $event)" />
        </FeathersVuexFind>
      </v-card-text>

      <v-card-actions class="ma-0 pa-0">
        <v-btn class="pa-0 ma-0 rounded-b-xl" color="primary" width="100%" height="40px" @click="$emit('input')">
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import StudentFilter from './StudentFilter.vue';
import StudentList from './StudentList.vue';

export default {
  components: { 
    StudentList,
    StudentFilter
   },
  props: {
    value: Boolean,
    session: Object
  },
  data: () => ({
    selectedSchool: '',
    selectedYear: null,
  }),
  mounted() {
    this.selectedSchool = this.session.school
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    query() {
      return {
        $sort: {
          name: 1,
        },
        ...(this.selectedYear && { schoolYear: this.selectedYear }),
        ...(this.selectedSchool && { school: this.selectedSchool }),
        $limit: 1000,
      };
    },
  },
};
</script>
