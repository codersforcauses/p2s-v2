<template>
  <v-col class="text-caption text--secondary">
    <span class="ml-6">{{ title }}</span>
    <v-card height="128" class="rounded-lg" flat>
      <v-skeleton-loader height="100%" type="image" :loading="false">
        <img
          v-if="link"
          :src="link"
          :alt="title"
          class="rounded-lg"
        />
        <v-card
          v-else
          height="128"
          class="rounded-lg d-flex justify-center align-center"
          flat
          color="#585858"
        >
          <v-btn height="100%" width="100%" class="rounded-lg" text :disabled="!editing">
            <v-icon :color="editing ? 'primary' : 'grey'">mdi-plus</v-icon>
          </v-btn>
        </v-card>
      </v-skeleton-loader>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
    },
    loading: {
      type: Boolean,
      required: true
    },
    editing: {
      type: Boolean,
      require: true
    }
  }
};
</script>
