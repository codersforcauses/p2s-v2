<template>
  <v-card flat tile height="100%" class="py-sm-12">
    <v-card-text height="100%" class="pa-0">
      <div class="ml-4 mt-sm-4 d-flex">
        <v-skeleton-loader
          tile
          type="image"
          :height="isSmAndUp"
          :min-width="isSmAndUp"
          class="rounded-lg"
        >
          <!-- <img src="src" alt="alt"> -->
        </v-skeleton-loader>
        <v-list-item three-line class="px-2 px-sm-4">
          <v-list-item-content class="py-0">
            <v-list-item-title class="text-h6">test admin</v-list-item-title>
            <v-list-item-subtitle>testadmin@p2srugbyworks.com</v-list-item-subtitle>
            <v-list-item-subtitle>+61 410987654</v-list-item-subtitle>
            <div>
              <v-icon title="Coach" color="primary">mdi-football-australian</v-icon>
              <v-icon title="Administrator" color="primary">mdi-shield-account</v-icon>
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-card outlined rounded="lg" flat class="mx-4 my-6">
        <v-card-text class="pb-0">Emergency Contact</v-card-text>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Name: Michael Moore</v-list-item-title>
            <v-list-item-subtitle>Num: +61 410987654</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <div class="coach">
        <div class="coach-docs text-caption text--secondary">
          <div class="wwc">
            WWC
            <v-skeleton-loader tile type="image" height="128" class="rounded-lg">
              <!-- <img src="src" alt="alt"> -->
            </v-skeleton-loader>
          </div>
          <div>
            Police Clearance
            <v-skeleton-loader tile type="image" height="128" class="rounded-lg">
              <!-- <img src="src" alt="alt"> -->
            </v-skeleton-loader>
          </div>
          <div>
            Medical Clearance
            <v-skeleton-loader tile type="image" height="128" class="rounded-lg">
              <!-- <img src="src" alt="alt"> -->
            </v-skeleton-loader>
          </div>
        </div>
        <!-- <v-card-text>Upcoming sessions in Region</v-card-text>
        <v-skeleton-loader type="list-item-two-line@10">
        </v-skeleton-loader>-->
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: {
          first: 'lorem',
          last: 'ipsum',
        },
      },
    };
  },
  computed: {
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
  },
};
</script>

<style scoped>
.coach-docs {
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.75rem;
}
.wwc {
  grid-column: 1 / span 2;
}

@media only screen and (min-width: 960px) {
  .coach-docs {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 1rem;
  }
  .wwc {
    grid-column: 1;
  }
}
</style>
