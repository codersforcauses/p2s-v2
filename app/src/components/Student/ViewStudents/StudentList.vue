<template>
  <v-skeleton-loader type="list-item-three-line@10" :loading="loading">
    <v-list three-line subheader>
      <v-list-item-group v-if="students.length > 0" v-model="selectedStudent" color="primary">
        <template v-for="student in students">
          <v-list-item :key="student._id" :value="student">
            <v-list-item-content>
              <v-list-item-title class="text--primary">{{ student.name }}</v-list-item-title>
                <v-list-item-subtitle v-if="schools" class="text--secondary">{{ getSchool(student.school).name }}</v-list-item-subtitle>
              <v-list-item-subtitle class="text--secondary">Year {{ student.schoolYear }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
      <v-list-item v-else>
        No Students
      </v-list-item>
    </v-list>
  </v-skeleton-loader>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

export default {
  name: "student-list",
  title: "Student List",
  mixins: [ 
    makeFindMixin({ service: 'schools', watch: true }),
  ],
  props: {
    value: Object,
    students: Array,
    loading: Boolean
  },
  computed: {
    schoolsParams() {
      return { query: {
        _id: { $in: this.students.map(stud => stud.school )}
      }}
    },
    selectedStudent: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('selected', val)
      }
    }
  },
  methods: {
    getSchool(id) {
      return this.schools.find(school => school._id === id)
    }
  }
}
</script>