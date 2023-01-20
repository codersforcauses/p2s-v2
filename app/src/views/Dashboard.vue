<template>
  <div style="height: 100%">
    <toolbar />
    <v-main style="height: 100%;">
      <v-sheet elevation="0" rounded="xl" min-height="100%" :color="sheet">
        <router-view />
      </v-sheet>
    </v-main>
    <!-- <fab /> -->
  </div>
</template>

<script>
import toolbar from '../components/layout/Toolbar.vue';
// import fab from '../components/layout/FAB';

export default {
  name: 'dashboard',
  components: {
    // fab,
    toolbar,
  },
  computed: {
    sheet() {
      return this.$vuetify.theme.dark ? '#272727' : '#ebebeb';
    },
  },
};
</script>

<style scoped>
.layout-grid {
  height: 100%;
  display: grid;
  grid-template-columns: minmax(320px, 1fr);
  grid-gap: 0.75rem;
  grid-auto-rows: 1;
}

@media only screen and (min-width: 600px) {
  .layout-grid {
    padding: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 1rem;
  }
}
</style>
