<template>
  <div class="d-flex align-center">
    <v-btn icon outlined :color="isActive ? 'primary' :  ''" @click="toggleAttendence" class="mx-3">
      <v-icon>{{ isActive ? 'mdi-account-check' :  'mdi-account' }}</v-icon>
    </v-btn>
    <!-- DOESN'T CURRENTLY HIGHLIGHT ON SELECT -->
    <v-list-item class="px-0 px-sm-3" :value="student" :input-value="isActiveStudent" color="primary"> 
      <template>
        <v-list-item-content>
          <v-list-item-title class="text--primary">{{ student.name }}</v-list-item-title>
          <v-list-item-subtitle class="text--secondary">
            Year {{ student.schoolYear }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-list-item>
    <v-btn depressed large :disabled="!report" :icon="!$vuetify.breakpoint.smAndUp" @click="$emit('openReport', report)">
      <v-icon :color="isActiveReport ? 'primary' :  ''">{{reportCompleted ? 'mdi-file-check' : 'mdi-file-edit'}}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    student: Object,
    session: Object,
    report: Object,
    activeStudent: Object,
    activeReport: Object
  },
  methods: {
    ...mapActions('reports', { updateReport: 'patch'}),
    toggleAttendence() {
      this.updateReport([this.report._id, { attended: this.report.attended === 'Present' ? 'SchoolAttended' : 'Present' }]);
    }
  },
  computed: {
    isActive() {
      return this.report ? this.report.attended === 'Present' : false
    },
    isActiveStudent() {
      return this.activeStudent ? this.activeStudent._id === this.student._id : false
    },
    isActiveReport() {
      return this.activeReport ? this.activeReport._id === this.report._id : false
    },
    reportCompleted() {
      return this.report ? Object.keys(this.report.matrixResults).every(category => Object.keys(this.report.matrixResults[category]).every(entry => this.report.matrixResults[category][entry].value !== -1)) : false
    }
  }
}
</script>
