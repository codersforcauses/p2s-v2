<template>
  <v-card flat rounded="xl">
    <v-card-subtitle>Test Card</v-card-subtitle>

    <v-card-text>Work in progress features</v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary" @click="matrix = true">View Matrix</v-btn>
      <matrix v-model="matrix" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {
    matrix: () => ({
      component: import('../other/Matrix.vue'),
    }),
  },
  data() {
    return {
      matrix: false,
    };
  },
};
</script>