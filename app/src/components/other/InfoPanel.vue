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
      class="py-3 pb-15 px-0"
    >
      <div class="nav-panel">
        <CloseButton @close="open = false"/>
        <slot />
      </div>
    </v-navigation-drawer>
    <v-bottom-sheet v-else v-model="open" scrollable>
      <v-sheet height="2000px" class="rounded-t-xl nav-panel">
        <CloseButton style="margin-top: 10px !important;" @close="open = false"/>
        <slot />
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import CloseButton from './CloseButton.vue'

export default {
  name: "info-panel",
  title: "Info Panel",
  components: {
    CloseButton
  },
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

<style scoped>
  .nav-panel {
    position: relative;
  }

  .btn-ontop {
    z-index:10; position: absolute; right: 0;
  }
</style>