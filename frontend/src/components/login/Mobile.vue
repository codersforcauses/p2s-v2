<template>
  <v-sheet tile height="100%" color="#c22032" style="overflow-y: hidden">
    <v-img
      contain
      class="mx-auto"
      height="30%"
      max-width="30vmax"
      :src="require('@/assets/p2s-logo.svg')"
    />
    <v-container fluid class="py-0" style="height: 100%">
      <v-row style="height: 100%">
        <v-col cols="12" class="pa-0">
          <v-sheet
            elevation="0"
            style="height: 100%"
            color="#272727"
            class="px-4 py-6 rounded-t-xl"
          >
            <slot name="form"></slot>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
