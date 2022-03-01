<template>
  <v-navigation-drawer
      v-model="open"
      v-if="$vuetify.breakpoint.smAndUp"
      width="50%"
      mobile-breakpoint="xs"
      fixed
      clipped
      right
      disable-resize-watcher
      disable-route-watcher
      class="py-3 px-0"
    >
      <v-btn icon class="float-right ma-0 mt-16 mr-3" style="z-index:10;" @click="open = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <slot />
    </v-navigation-drawer>
    <v-bottom-sheet v-else v-model="open" scrollable>
      <v-sheet
        class="pa-4 rounded-t-xl">
        <v-btn icon class="float-right ma-2" style="z-index:10;" @click="open = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <slot />
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>
export default {
  name: "info-panel",
  title: "Info Panel",
  props: {
    selectedStudent: Object,
    value: Boolean
  },
  computed: {
    open: {
      get() {
        return this.value
      }, 
      set(newVal) {
        this.$emit('input', newVal)
      }
    }
  }
}
</script>