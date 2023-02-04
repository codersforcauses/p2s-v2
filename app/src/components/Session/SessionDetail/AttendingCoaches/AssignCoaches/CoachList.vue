<template>
  <v-skeleton-loader type="list-item-two-line@10" :loading="!coaches">
    <v-list v-if="coaches.length !== 0" two-line subheader flat>
      <v-list-item-group multiple color="primary">
        <template v-for="coach in coaches">
          <v-list-item :key="coach._id" @click="updateList(coach._id)" class="px-0 px-sm-3">
              <v-list-item-action>
                <v-checkbox :input-value="isActive(coach._id)" color="primary"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text--primary">{{
                  coach.name
                }}</v-list-item-title>
                <v-list-item-subtitle class="text--secondary">
                  {{ coachAddress(coach.address) }}
                </v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <p v-else>No coaches found</p>
  </v-skeleton-loader>
</template>

<script>
export default {
  props: {
    coaches: Array,
    session: Object
  },
  data: () => ({
    selected: [],
  }),
  created() {
    this.selected = [...this.session.coaches]
  },
  methods: {
    coachAddress(address) {
        return address ? `${address.suburb}, ${address.state}` : ''
    },
    updateList(coachId) {
      const index = this.selected.findIndex(id => coachId === id)
      if(index >= 0) this.selected.splice(index, 1) 
      else this.selected.push(coachId)
      this.$emit('update', this.selected)
    },
    isActive(coachId) {
      return this.selected.some(id => coachId === id)
    }
  }
}
</script>
