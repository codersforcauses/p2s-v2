<template>
  <v-skeleton-loader type="list-item-two-line@10" :loading="isPending">
    <v-list two-line subheader>
      <v-list-item @click="openCreateDialog">
        <v-icon color="primary">mdi-plus</v-icon>
        <v-list-item-subtitle class="ml-3" style="color: #f87f79">Add Session</v-list-item-subtitle>
        <SessionDialog v-model="sessionDialog" />
      </v-list-item>
      <v-list-item-group v-model="selected" @change="selectSession" mandatory color="primary">
        <template v-for="session in sessions">
          <v-list-item :key="session._id" @click="$emit('open')">
            <ListEntry :session="session" />
          </v-list-item>
        </template>
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
    selected: 0,
    sessionDialog: false
  }),
  methods: {
    openCreateDialog() {
      this.$emit('selected', null)
      this.sessionDialog = true
    },
    selectSession() {
      this.$emit('selected', this.sessions[this.selected])
    },
  },
  watch: {
    sessions: {
      deep: true,
      handler() {
        this.selected = null
      }
    }
  }
}
</script>