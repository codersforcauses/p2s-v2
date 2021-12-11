<template>
  <div class="d-flex align-center">
    <v-list-item class="px-0 px-sm-3" @click="$emit('toggleStudentPresent', student._id)" >
      <template>
        <v-list-item-action>
          <v-icon>{{ isActive ? 'mdi-account-check' :  'mdi-account' }}</v-icon></v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text--primary">{{ student.name }}</v-list-item-title>
          <v-list-item-subtitle class="text--secondary">
            Year {{ student.schoolYear }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-list-item>
    <v-btn depressed large :disabled="!report" :icon="!$vuetify.breakpoint.smAndUp" @click="$emit('openReport', student._id)">
      <v-icon>mdi-file-edit</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    student: Object,
    session: Object,
    presentList: Array,
    report: Object
  },
  computed: {
    isActive() {
      return this.presentList.some(id => id === this.student._id)
    }
  },
  methods: {
    ...mapActions('reports', { findReports: 'find', createReport: 'create', updateReport: 'patch'}),
  }

}
</script>
