<template>
  <v-card flat rounded="xl">
    <v-img
      position="bottom"
      :aspect-ratio="2/1"
      :src="require(`@/assets/wa-${$vuetify.theme.dark? 'dark':'light'}.svg`)"
    >
      <template #placeholder>
        <v-skeleton-loader type="image" />
      </template>
    </v-img>
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Regions</v-card-title>

    <v-card-text>
      View all the regions
      <br />Create a new region to sub manage
    </v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary">View All</v-btn>
      <v-btn text rounded color="primary" @click="regionDialog = true">Create New</v-btn>
      <new-region v-model="regionDialog" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {
    'new-region': () => ({
      component: import('./NewRegion.vue'),
    }),
  },
  data() {
    return {
      regionDialog: false,
    };
  },
};
</script>
