<template>
  <v-list-item-content>
    <v-list-item-title class="text--primary">{{ user.name }}</v-list-item-title>
    <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
    <v-list-item-subtitle>
      {{ user.admin.is ? 'admin' : null }}
      <span v-show="user.admin.is && user.coach.is">&bull;</span>
      {{ user.coach.is ? 'coach' : null }}
    </v-list-item-subtitle>
  </v-list-item-content>
</template>

<script>
export default {
  props: {
    user: Object
  }
}
</script>