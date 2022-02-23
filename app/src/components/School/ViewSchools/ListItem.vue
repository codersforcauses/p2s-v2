<template>
  <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text--primary">{{school.name}}</v-list-item-title>
        <v-list-item-subtitle>{{`${school.address.suburb}, ${school.address.state}`}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
  props: {
    school: Object
  }
}
</script>