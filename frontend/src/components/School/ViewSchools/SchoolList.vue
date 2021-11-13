<template>
  <v-skeleton-loader type="list-item-two-line@10" :loading="isPending">
    <v-list two-line subheader>
      <v-list-item-group v-model="selected" @change="selectSchool" mandatory color="primary">
        <template v-for="school in schools">
          <v-list-item :key="school._id" @click="$emit('open')">
            <v-list-item-content>
              <v-list-item-title class="text--primary">{{school.name}}</v-list-item-title>
              <v-list-item-subtitle>{{`${school.address.suburb}, ${school.address.state}`}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
</template>

<script>

export default {
  name: "school-list",
  title: "School List",
  props: {
    schools: Array,
    isPending: Boolean,
  },
  data: () => ({
    selected: 0
  }),
  methods: {
    selectSchool() {
      this.$emit('selected', this.schools[this.selected])
    }
  },
  watch: {
    schools: {
      deep: true,
      handler() {
        this.selected = null
      }
    }
  }
}
</script>