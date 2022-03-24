<template>
  <v-skeleton-loader type="list-item-three-line@10" :loading="isPending">
    <v-list three-line subheader>
      <v-list-item-group v-model="selectedStudent" color="primary">
        <template v-for="student in students">
          <v-list-item :key="student._id" :value="student">
            <v-list-item-content>
              <v-list-item-title class="text--primary">{{ student.name }}</v-list-item-title>
              <v-list-item-subtitle class="text--secondary">Year {{ student.schoolYear }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
</template>

<script>

export default {
  name: "student-list",
  title: "Student List",
  props: {
    value: Object,
    students: Array,
    isPending: Boolean,
  },
  computed: {
    selectedStudent: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('selected', val)
      }
    }
  },
}
</script>