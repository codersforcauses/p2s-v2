<template>
  <v-skeleton-loader type="list-item-three-line@10" :loading="isPending">
    <v-list three-line subheader>
      <v-list-item-group v-model="selected" @change="selectUser" color="primary">
        <template v-for="user in users">
          <v-list-item :key="user._id" @click="$emit('open')">
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
  title: "Staff List",
  props: {
    users: Array,
    isPending: Boolean,
  },
  data: () => ({
    selected: 0
  }),
  methods: {
    selectUser() {
      this.$emit('selected', this.users[this.selected])
    }
  },
  watch: {
    users: {
      deep: true,
      handler() {
        this.selected = null
      }
    }
  }
}
</script>