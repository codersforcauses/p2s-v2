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
      <template #default>
          <slot />
      </template>
    </v-navigation-drawer>
    <v-bottom-sheet v-else v-model="open" scrollable>
      <v-sheet class="rounded-t-xl pt-6">
        <template #default>
          <slot />
        </template>
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