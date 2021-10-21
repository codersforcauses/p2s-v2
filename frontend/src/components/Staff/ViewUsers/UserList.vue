<template>
  <v-skeleton-loader type="list-item-three-line@10" :loading="isPending">
    <v-list three-line subheader>
      <v-list-item-group v-model="selected" @change="selectUser" mandatory color="primary">
        <template v-for="user in users">
          <v-list-item :key="user._id" @click="$emit('open')">
            <v-list-item-content>
              <v-list-item-title class="text--primary">{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ user.admin.is ? 'admin' : null }}
                <span v-show="user.admin.is && user.coach.is">&bull;</span>
                {{ user.coach.is ? 'coach' : null }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
</template>

<script>

export default {
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