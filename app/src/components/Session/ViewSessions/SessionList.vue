<template>
  <v-skeleton-loader type="list-item-two-line@10" :loading="isPending">
    <v-list-item @click="openCreateDialog">
      <v-icon color="primary">mdi-plus</v-icon>
      <v-list-item-subtitle class="ml-3" style="color: #f87f79">Add Session</v-list-item-subtitle>
      <SessionDialog v-model="sessionDialog" />
    </v-list-item>
    <v-list two-line subheader>
      <v-list-item-group v-model="selectedSession" color="primary">
        <v-list-item v-for="session in sessions" :key="session._id" :value="session">
          <ListEntry :session="session" />
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
</template>

<script>
import SessionDialog from '../SessionDialog';
import ListEntry from './ListEntry'

export default {
  name: "session-list",
  title: "Session List",
  components: {
    SessionDialog,
    ListEntry
  },
  props: {
    sessions: Array,
    isPending: Boolean,
  },
  data: () => ({
    sessionDialog: false
  }),
  methods: {
    openCreateDialog() {
      this.selectedSession = null
      this.sessionDialog = true
    },
  },
  computed: {
    selectedSession: {
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