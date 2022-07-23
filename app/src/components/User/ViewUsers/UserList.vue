<template>
  <v-skeleton-loader type="list-item-three-line@10" :loading="loading">
    <v-list three-line subheader>
      <v-list-item-group v-model="selectedUser" color="primary">
        <template v-for="user in users">
          <v-list-item :key="user._id" :value="user">
            <UserListDisplay :user="user" />
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
</template>

<script>
import UserListDisplay from './UserListDisplay.vue'

export default {
  components: { UserListDisplay },
  name: "user-list",
  title: "User List",
  props: {
    value: Object,
    users: Array,
    loading: Boolean,
  },
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
}
</script>