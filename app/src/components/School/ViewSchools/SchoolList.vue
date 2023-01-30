<template>
  <v-skeleton-loader type="list-item-two-line@10" :loading="loading">
    <v-list-item @click="createDialogOpen = true">
      <v-icon color="primary">mdi-plus</v-icon>
      <v-list-item-subtitle class="ml-3 primary--text">Add School</v-list-item-subtitle>
      <SchoolDialog v-model="createDialogOpen" />
    </v-list-item>
    <v-list two-line subheader>
      <v-list-item-group v-model="selected"  color="primary">
        <ListItem v-for="school in schools" :key="school._id" :school="school" />
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
</template>

<script>
import ListItem from './ListItem.vue'
import SchoolDialog from '../SchoolDialog';

export default {
  components: {
    ListItem,
    SchoolDialog
  },
  name: "school-list",
  title: "School List",
  props: {
    value: Object,
    schools: Array,
    loading: Boolean
  },
  data: () => ({
    createDialogOpen: false
  }),
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('selected', val)
      }
    },
  },
  watch: {
    schools: {
      deep: true,
      handler() {
        this.selected = null
      }
    },
  }
}
</script>