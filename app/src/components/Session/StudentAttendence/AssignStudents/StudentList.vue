<template>
  <v-skeleton-loader type="list-item-two-line@10" :loading="!students">
    <v-list v-if="students.length > 0" two-line subheader flat>
      <v-list-item-group multiple color="primary">
        <template v-for="student in students">
          <v-list-item :key="student._id" @click="updateList(student._id)" class="px-0 px-sm-3">
              <v-list-item-action>
                <v-checkbox :input-value="isActive(student._id)" color="primary"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text--primary">{{
                  student.name
                }}</v-list-item-title>
                <v-list-item-subtitle class="text--secondary">
                  Year {{ student.schoolYear }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <FeathersVuexGet
                v-slot="{ item: school }"
                service="schools"
                :id="student.school"
                :watch="[student.school]"
              >
                <v-list-item-content v-if="school">{{ school ? school.name : 'loading' }}</v-list-item-content>
              </FeathersVuexGet>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <p v-else>No Students Found</p>
  </v-skeleton-loader>
</template>

<script>
export default {
  props: {
    students: Array,
    session: Object
  },
  data: () => ({
    selected: [],
  }),
  created() {
    this.selected = [...this.session.students]
  },
  methods: {
    updateList(studentId) {
      const index = this.selected.findIndex(id => studentId === id)
      if(index >= 0) this.selected.splice(index, 1) 
      else this.selected.push(studentId)
      this.$emit('update', this.selected)
    },
    isActive(studentId) {
      return this.selected.some(id => studentId === id)
    }
  }
}
</script>
