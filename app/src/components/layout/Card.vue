<template>
  <v-card flat rounded="xl" class="d-flex flex-column justify-space-between">
    <v-card-title primary-title class="text-h4 pb-0">{{ title }}</v-card-title>
    <v-card-text>
      <slot name="content"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: {
    title: String
  }
}
</script>