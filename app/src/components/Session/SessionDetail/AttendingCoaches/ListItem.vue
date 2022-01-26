<template>
  <div class="d-flex align-center">
    <v-list-item class="px-0 px-sm-3" @click="$emit('openInfo', coach)" >
      <template>
        <v-list-item-action class="ml-4">
          <v-icon>mdi-account-heart</v-icon>
          </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text--primary">{{ coach.name }}</v-list-item-title>
        </v-list-item-content>
      </template>
    </v-list-item>
  </div>
</template>

<script>

export default {
  props: {
    coach: Object,
    session: Object,
  },
}
</script>
