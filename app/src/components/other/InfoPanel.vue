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
      class="px-0"
    >
    <div>
        <CloseButton @close="open = false"/>
        <v-card flat class="rounded-t-xl">
          <v-card-text height="100%">
            <slot name="content"></slot>
          </v-card-text>
          <v-card-actions>
            <slot name="actions"></slot>
          </v-card-actions>
        </v-card>
      </div>
    </v-navigation-drawer>
    <v-bottom-sheet v-else v-model="open" scrollable>
      <v-card style="position: relative;" class="rounded-t-xl nav-panel">
        <CloseButton style="margin-top: 10px !important;" @close="open = false"/>
        <v-card-text height="500px">
          <slot name="content"></slot>
        </v-card-text>
        <v-card-actions>
          <slot name="actions"></slot>
        </v-card-actions>
      </v-card>
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
