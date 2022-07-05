<template>
  <div :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
    <v-tabs v-model="selectedTab">
      <v-tab class="text-capitalize text-body-2">Future Sessions</v-tab>
      <v-tab class="text-capitalize text-body-2">Past Sessions</v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  props: {
    queryInfo: Object,
    tab: Number
  },
  computed: {
    selectedTab: {
      get() {
        return this.tab
      },
      set(val) {
        this.$emit('setTab', val)
      }
    }
  }
}
</script>