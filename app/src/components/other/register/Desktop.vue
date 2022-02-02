<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters style="height: 100vh">
      <v-col cols="5">
        <v-sheet tile elevation="0" color="#c22032" class="pa-4" height="100%">
          <v-img
            contain
            class="mx-auto"
            height="100%"
            max-width="27vmax"
            :src="require('@/assets/p2s-logo.svg')"
          />
        </v-sheet>
      </v-col>

      <v-col cols="7">
        <v-sheet
          tile
          elevation="0"
          color="#272727"
          height="100%"
          class="d-flex flex-column align-center justify-center contain"
        >
          <slot name="form"></slot>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.contain {
  position: relative;
}
</style>
