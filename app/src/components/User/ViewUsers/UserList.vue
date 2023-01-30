<template>
  <v-skeleton-loader type="list-item-three-line@10" :loading="loading">
    <v-list-item @click="openInviteDialog">
      <v-icon color="primary">mdi-plus</v-icon>
      <v-list-item-subtitle class="ml-3 primary--text">Invite User</v-list-item-subtitle>
      <UserDialog v-model="userDialog" />
    </v-list-item>
    <v-list three-line subheader>
      <v-list-item-group v-model="selectedUser" color="primary">
        <v-list-item v-for="user in users" :key="user._id" :value="user">
          <UserListDisplay :user="user" />
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
</template>

<script>
import UserListDisplay from './UserListDisplay.vue'
import UserDialog from '../UserDialog';

export default {
  components: {
    UserListDisplay,
    UserDialog
  },
  name: "user-list",
  title: "User List",
  props: {
    value: Object,
    users: Array,
    loading: Boolean,
  },
  data: () => ({
    userDialog: false
  }),
  computed: {
    selectedUser: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('selected', val)
      }
    }
  },
  methods: {
    openInviteDialog() {
      this.selectedUser = null
      this.userDialog = true
    },
  }
}
</script>